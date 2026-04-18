import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function InfoScreen() {
  const router = useRouter();

  return (
    <View style={ui.wrapper}>
      <View style={ui.iconContainer}>
        <MaterialCommunityIcons name="folder-information-outline" size={80} color="#007AFF" />
      </View>
      
      <Text style={ui.headline}>File Manager Pro</Text>
      <Text style={ui.version}>Версія 1.0.4</Text>

      <View style={ui.card}>
        <Text style={ui.description}>
          Цей застосунок дозволяє керувати локальними файлами вашого пристрою. 
          Ви можете створювати, редагувати та видаляти текстові дані, а також 
          контролювати вільне місце на диску.
        </Text>
      </View>

      <Pressable 
        style={({ pressed }) => [ui.backBtn, pressed && { opacity: 0.7 }]} 
        onPress={() => router.back()}
      >
        <Text style={ui.backBtnText}>Повернутися до роботи</Text>
      </Pressable>
    </View>
  );
}

const ui = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#F2F2F7',
    padding: 20 
  },
  iconContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  headline: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#1C1C1E',
    marginBottom: 5 
  },
  version: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  description: { 
    fontSize: 16, 
    lineHeight: 24, 
    textAlign: 'center',
    color: '#3A3A3C'
  },
  backBtn: {
    marginTop: 40,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  backBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  }
});