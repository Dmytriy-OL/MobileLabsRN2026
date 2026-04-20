import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsModal() {
  const router = useRouter();

  return (
    <View style={styles.modalWrapper}>
      {/* Налаштовуємо заголовок модалки */}
      <Stack.Screen options={{ 
        title: 'Інформація',
        headerLeft: () => (
          Platform.OS === 'ios' ? null : (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="#000" />
            </Pressable>
          )
        )
      }} />

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="information-circle-outline" size={50} color="#007AFF" />
        </View>
        
        <Text style={styles.heading}>Версія додатка 1.0.5</Text>
        <Text style={styles.description}>
          Ця лабораторна робота виконана в рамках курсу "Розробка мобільних додатків". 
          Використано технології: React Native, Expo Router та Context API.
        </Text>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Розробник:</Text>
            <Text style={styles.infoValue}>Олійник Дмитро</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Статус:</Text>
            <Text style={styles.infoValue}>Beta Test</Text>
          </View>
        </View>

        <Pressable 
          style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.7 }]} 
          onPress={() => router.back()}
        >
          <Text style={styles.closeBtnText}>Зрозуміло</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 25,
    paddingTop: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#636366',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  infoList: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    color: '#8E8E93',
    fontSize: 16,
  },
  infoValue: {
    fontWeight: '600',
    color: '#1C1C1E',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F7',
  },
  closeBtn: {
    backgroundColor: '#000',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});