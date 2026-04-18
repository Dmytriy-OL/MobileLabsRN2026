import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, Alert, StyleSheet, SafeAreaView 
} from 'react-native';
import * as ExpoFileSystem from 'expo-file-system/legacy';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ROOT_PATH = ExpoFileSystem.documentDirectory || 'file:///fake-root/';

export default function AppMainScreen() {
  const [activeDir, setActiveDir] = useState(ROOT_PATH || '');
  const [contentList, setContentList] = useState([]);
  const [diskSpace, setDiskSpace] = useState({ capacity: 0, available: 0 });
  
  const [viewState, setViewState] = useState({
    creating: false,
    editing: false,
    viewingInfo: false
  });
  
  const [formName, setFormName] = useState('');
  const [textBuffer, setTextBuffer] = useState('');
  const [targetUri, setTargetUri] = useState('');
  const [activeItemInfo, setActiveItemInfo] = useState(null);

  const refreshFileSystemData = useCallback(async () => {
    if (!activeDir) return;

    try {
      const [total, free, names] = await Promise.all([
        ExpoFileSystem.getTotalDiskCapacityAsync(),
        ExpoFileSystem.getFreeDiskStorageAsync(),
        ExpoFileSystem.readDirectoryAsync(activeDir)
      ]);

      setDiskSpace({ capacity: total, available: free });

      const mappedData = await Promise.all(names.map(async (fileName) => {
        const baseDir = activeDir.endsWith('/') ? activeDir : `${activeDir}/`;
        const fullUri = `${baseDir}${fileName}`;
        const meta = await ExpoFileSystem.getInfoAsync(fullUri);
        return {
          id: fullUri,
          title: fileName,
          path: fullUri,
          type: meta.isDirectory ? 'dir' : 'file',
          weight: meta.size || 0,
          updatedAt: meta.modificationTime
        };
      }));

      setContentList(mappedData.sort((a, b) => {
        if (a.type === b.type) return a.title.localeCompare(b.title);
        return a.type === 'dir' ? -1 : 1;
      }));
    } catch (err) {
      console.error(err);
    }
  }, [activeDir]);

  useEffect(() => {
    if (ROOT_PATH && !activeDir) {
      setActiveDir(ROOT_PATH);
    }
    refreshFileSystemData();
  }, [refreshFileSystemData, ROOT_PATH]);

  const convertBytesToGB = (v) => `${(v / 1024 ** 3).toFixed(2)} ГБ`;

  const onCreateTrigger = async (isFolder) => {
    if (!formName.trim()) return Alert.alert("Увага", "Назва не може бути порожньою");
    
    const currentPath = activeDir || ROOT_PATH;
    if (!currentPath) return Alert.alert("Помилка", "Шлях не визначено");

    const cleanDir = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;
    const newPath = `${cleanDir}${formName.trim()}${isFolder ? '/' : '.txt'}`;
    
    try {
      if (isFolder) {
        await ExpoFileSystem.makeDirectoryAsync(newPath, { intermediates: true });
      } else {
        await ExpoFileSystem.writeAsStringAsync(newPath, textBuffer || 'New File content');
      }
      setViewState(prev => ({ ...prev, creating: false }));
      setFormName('');
      setTextBuffer('');
      refreshFileSystemData();
    } catch (e) {
      Alert.alert("Помилка", "Дія відхилена системою");
    }
  };

  const onRemoveRequest = (item) => {
    Alert.alert("Видалення", `Ви впевнені щодо ${item.title}?`, [
      { text: "Ні", style: "default" },
      { 
        text: "Так, видалити", 
        style: "destructive", 
        onPress: async () => {
          await ExpoFileSystem.deleteAsync(item.path);
          refreshFileSystemData();
        } 
      }
    ]);
  };

  const handleInteraction = async (item) => {
    if (item.type === 'dir') {
      const target = item.path.endsWith('/') ? item.path : `${item.path}/`;
      setActiveDir(target);
    } else {
      try {
        const rawText = await ExpoFileSystem.readAsStringAsync(item.path);
        setTargetUri(item.path);
        setTextBuffer(rawText);
        setViewState(prev => ({ ...prev, editing: true }));
      } catch (e) {
        Alert.alert("Упс", "Не вдалося прочитати вміст");
      }
    }
  };

  const navigateUp = () => {
    if (!activeDir || !ROOT_PATH || activeDir === ROOT_PATH) return;
    
    const currentPath = activeDir.endsWith('/') ? activeDir.slice(0, -1) : activeDir;
    const parts = currentPath.split('/');
    parts.pop();
    
    const parent = parts.join('/') + '/';
    setActiveDir(parent.startsWith(ROOT_PATH) ? parent : ROOT_PATH);
  };

  return (
    <SafeAreaView style={ui.screen}>
      <View style={ui.storageCard}>
        <Text style={ui.storageHeader}>Пам'ять пристрою</Text>
        <View style={ui.storageRow}>
          <Text style={ui.storageText}>Всього: {convertBytesToGB(diskSpace.capacity)}</Text>
          <Text style={ui.storageText}>Вільно: {convertBytesToGB(diskSpace.available)}</Text>
        </View>
        <View style={ui.progressBarBase}>
           <View style={[ui.progressBarFill, { width: `${((diskSpace.capacity - diskSpace.available) / (diskSpace.capacity || 1) * 100) || 0}%` }]} />
        </View>
      </View>

      <View style={ui.actionBar}>
        <TouchableOpacity onPress={navigateUp} style={ui.roundBtn}>
          <MaterialCommunityIcons name="chevron-left" size={30} color={(activeDir === ROOT_PATH) ? "#AAA" : "#222"} />
        </TouchableOpacity>
        <Text style={ui.currentPathLabel} numberOfLines={1}>
          {activeDir && ROOT_PATH ? activeDir.replace(ROOT_PATH, 'Home/') : 'Home/'}
        </Text>
        <TouchableOpacity onPress={() => setViewState(p => ({...p, creating: true}))} style={ui.roundBtn}>
          <MaterialCommunityIcons name="plus" size={30} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={contentList}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={ui.fileRow}>
            <TouchableOpacity style={ui.fileMainArea} onPress={() => handleInteraction(item)}>
              <MaterialCommunityIcons 
                name={item.type === 'dir' ? "folder-outline" : "file-document-outline"} 
                size={26} 
                color={item.type === 'dir' ? "#FFB300" : "#444"} 
              />
              <Text style={ui.fileTitle}>{item.title}</Text>
            </TouchableOpacity>
            <View style={ui.fileActions}>
              <TouchableOpacity onPress={() => {
                setActiveItemInfo({
                  ...item,
                  ext: item.title.split('.').pop(),
                  date: item.updatedAt ? new Date(item.updatedAt * 1000).toLocaleString() : 'N/A'
                });
                setViewState(p => ({...p, viewingInfo: true}));
              }}>
                <MaterialCommunityIcons name="information-variant" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onRemoveRequest(item)} style={{marginLeft: 15}}>
                <MaterialCommunityIcons name="delete-sweep-outline" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={viewState.creating} animationType="slide">
        <View style={ui.fullModal}>
          <Text style={ui.modalTitle}>Новий об'єкт</Text>
          <TextInput placeholder="Назва елемента" style={ui.darkInput} value={formName} onChangeText={setFormName} />
          <TextInput 
            placeholder="Вміст (для файлів)" 
            style={[ui.darkInput, { height: 120 }]} 
            multiline 
            value={textBuffer} 
            onChangeText={setTextBuffer} 
          />
          <View style={ui.buttonGroup}>
            <TouchableOpacity style={ui.actionBtn} onPress={() => onCreateTrigger(true)}>
               <Text style={ui.actionBtnText}>Папка</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ui.actionBtn, {backgroundColor: '#222'}]} onPress={() => onCreateTrigger(false)}>
               <Text style={ui.actionBtnText}>Файл</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setViewState(p => ({...p, creating: false}))}>
            <Text style={ui.cancelLink}>Скасувати</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={viewState.editing} animationType="fade">
        <SafeAreaView style={ui.fullModal}>
          <Text style={ui.modalTitle}>Редактор</Text>
          <TextInput 
            style={ui.editorArea} 
            multiline 
            value={textBuffer} 
            onChangeText={setTextBuffer} 
          />
          <TouchableOpacity style={ui.saveBtn} onPress={async () => {
            await ExpoFileSystem.writeAsStringAsync(targetUri, textBuffer);
            setViewState(p => ({...p, editing: false}));
            refreshFileSystemData();
          }}>
            <Text style={ui.saveBtnText}>Записати зміни</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setViewState(p => ({...p, editing: false}))}>
            <Text style={ui.cancelLink}>Вийти без збереження</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      <Modal visible={viewState.viewingInfo} transparent>
        <View style={ui.blurOverlay}>
          <View style={ui.detailsCard}>
            <Text style={ui.detailsTitle}>Специфікація</Text>
            {activeItemInfo && (
              <View style={ui.detailsList}>
                <Text>📂 <Text style={ui.bold}>Ім'я:</Text> {activeItemInfo.title}</Text>
                <Text>📝 <Text style={ui.bold}>Тип:</Text> {activeItemInfo.type === 'dir' ? 'Директорія' : activeItemInfo.ext}</Text>
                <Text>📊 <Text style={ui.bold}>Розмір:</Text> {(activeItemInfo.weight / 1024).toFixed(1)} КБ</Text>
                <Text>🕒 <Text style={ui.bold}>Дата:</Text> {activeItemInfo.date}</Text>
              </View>
            )}
            <TouchableOpacity 
              style={ui.closeDetails} 
              onPress={() => setViewState(p => ({...p, viewingInfo: false}))}
            >
              <Text style={ui.saveBtnText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const ui = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8F9FA' },
  storageCard: { margin: 15, padding: 15, backgroundColor: '#FFF', borderRadius: 15, elevation: 2 },
  storageHeader: { fontSize: 16, color: '#666', marginBottom: 10 },
  storageRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  storageText: { fontSize: 13, fontWeight: '600' },
  progressBarBase: { height: 6, backgroundColor: '#E9ECEF', borderRadius: 3 },
  progressBarFill: { height: '100%', backgroundColor: '#007AFF', borderRadius: 3 },
  actionBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 10 },
  roundBtn: { padding: 5 },
  currentPathLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: '#333', marginHorizontal: 10 },
  fileRow: { flexDirection: 'row', padding: 15, marginHorizontal: 15, backgroundColor: '#FFF', borderRadius: 12, marginBottom: 8, alignItems: 'center' },
  fileMainArea: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  fileTitle: { marginLeft: 15, fontSize: 16, color: '#212529' },
  fileActions: { flexDirection: 'row', alignItems: 'center' },
  fullModal: { flex: 1, padding: 30, backgroundColor: '#FFF' },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 25, color: '#222' },
  darkInput: { backgroundColor: '#F1F3F5', padding: 15, borderRadius: 12, fontSize: 16, marginBottom: 15 },
  buttonGroup: { flexDirection: 'row', gap: 15 },
  actionBtn: { flex: 1, backgroundColor: '#34C759', padding: 18, borderRadius: 12, alignItems: 'center' },
  actionBtnText: { color: '#FFF', fontWeight: '700' },
  cancelLink: { marginTop: 30, textAlign: 'center', color: '#ADB5BD', fontSize: 16 },
  editorArea: { flex: 1, backgroundColor: '#F8F9FA', padding: 20, borderRadius: 15, fontSize: 16, color: '#333' },
  saveBtn: { backgroundColor: '#007AFF', marginVertical: 20, padding: 18, borderRadius: 15, alignItems: 'center' },
  saveBtnText: { color: '#FFF', fontWeight: 'bold' },
  blurOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 25 },
  detailsCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 25 },
  detailsTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  detailsList: { gap: 10 },
  bold: { fontWeight: '700' },
  closeDetails: { marginTop: 20, backgroundColor: '#222', padding: 15, borderRadius: 12, alignItems: 'center' }
});