import React, { useState } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
// Використовуємо стандартні компоненти замість кастомних ThemedView, 
// щоб код не залежав від купи інших файлів шаблону
import { Text } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';

export function Accordion({ children, title, defaultOpen = false }) {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [
          styles.trigger,
          pressed && { opacity: 0.7 }
        ]}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.titleText}>{title}</Text>
        
        <View style={[
          styles.iconBox, 
          { transform: [{ rotate: expanded ? '180deg' : '0deg' }] }
        ]}>
          <Ionicons name="chevron-down" size={20} color="#007AFF" />
        </View>
      </Pressable>

      {expanded && (
        <View style={styles.body}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    overflow: 'hidden',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    backgroundColor: '#fff',
  },
});