import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { contactsSections } from '../data/contactsData';

export default function ContactsScreen() {
  return (
    <View style={styles.screen}>
      <SectionList
        sections={contactsSections}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.contactRow}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerBox}>
            <Text style={styles.headerLabel}>{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.line} />}
        stickySectionHeadersEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  headerBox: { backgroundColor: '#f8fafc', padding: 12, borderLeftWidth: 4, borderLeftColor: '#6366f1' },
  headerLabel: { fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' },
  contactRow: { padding: 18 },
  contactName: { fontSize: 16, fontWeight: '600', color: '#334155' },
  contactPhone: { fontSize: 14, color: '#94a3b8', marginTop: 4 },
  line: { height: 1, backgroundColor: '#f1f5f9', marginHorizontal: 18 }
});