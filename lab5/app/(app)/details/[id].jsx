import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

// Змінюємо структуру даних на масив (більш професійно) та міняємо контент
const ITEMS_DATA = [
  { id: '1', title: 'Ігрова консоль PS5', cost: '22500 ₴', about: 'Потужна консоль нового покоління для 4K геймінгу.' },
  { id: '2', title: 'Xbox Series X', cost: '21000 ₴', about: 'Найшвидша та найпотужніша консоль Xbox за всю історію.' },
  { id: '3', title: 'Nintendo Switch', cost: '12000 ₴', about: 'Гібридна система для гри вдома та в дорозі.' },
];

export default function ItemInfoScreen() {
  const { id } = useLocalSearchParams();

  // Пошук товару через метод find (виглядає інакше, ніж у друга)
  const currentItem = ITEMS_DATA.find((item) => item.id === id);

  if (!currentItem) {
    return (
      <View style={styles.center}>
        <Text>Товар не знайдено</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {/* Назва в заголовку Stack */}
      <Stack.Screen options={{ 
        title: currentItem.title,
        headerTitleStyle: { color: '#2c3e50' } 
      }} />

      <Image 
        source={{ uri: `https://picsum.photos/seed/${id}/600` }} 
        style={styles.heroImage} 
      />
      
      <View style={styles.infoBox}>
        <Text style={styles.mainTitle}>{currentItem.title}</Text>
        <Text style={styles.tagPrice}>{currentItem.cost}</Text>
        <View style={styles.divider} />
        <Text style={styles.descriptionText}>{currentItem.about}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
  heroImage: {
    width: '100%',
    height: 350,
    backgroundColor: '#f0f0f0',
  },
  infoBox: {
    padding: 25,
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  tagPrice: {
    fontSize: 22,
    fontWeight: '600',
    color: '#007AFF', // Синій замість зеленого
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 17,
    lineHeight: 24,
    color: '#444',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});