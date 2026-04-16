import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.main}>
      <View style={styles.header}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarLabel}>ДО</Text>
        </View>
        <Text style={styles.userName}>Дмитро Олійник</Text>
        <View style={styles.groupTag}>
          <Text style={styles.groupText}>BT-22-1</Text>
        </View>
      </View>
      <View style={styles.menuList}>
        <DrawerItemList 
          {...props} 
          activeTintColor="#6366f1" 
          inactiveTintColor="#64748b"
          labelStyle={{ fontWeight: '700' }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  main: { backgroundColor: '#ffffff' },
  header: {
    paddingVertical: 40,
    backgroundColor: '#4338ca', 
    alignItems: 'center',
    borderBottomRightRadius: 40,
  },
  avatarBox: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: '#818cf8',
    justifyContent: 'center', alignItems: 'center', marginBottom: 15,
  },
  avatarLabel: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  groupTag: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  groupText: { color: '#e0e7ff', fontSize: 12, fontWeight: '600' },
  menuList: { marginTop: 15 }
});