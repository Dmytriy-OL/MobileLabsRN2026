import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const { title, description, image, id } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <View style={styles.idBadge}>
            <Text style={styles.idText}>ID: {id}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Дані отриманні через navigation.navigate. Заголовок сформовано динамічно на основі переданих параметрів.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 250,
  },
  textContainer: {
    padding: 20,
  },
  idBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  idText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3b82f6',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 12,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 26,
    marginBottom: 20,
  },
  footer: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});