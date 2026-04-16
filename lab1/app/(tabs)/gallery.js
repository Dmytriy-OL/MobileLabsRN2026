import { View, FlatList, StyleSheet, Dimensions, Text, Image } from 'react-native';

const IMAGES = [
  { id: '1', src: require('../../assets/images/img1.jpg') },
  { id: '2', src: require('../../assets/images/img2.jpg') },
  { id: '3', src: require('../../assets/images/img3.jpg') },
  { id: '4', src: require('../../assets/images/img4.jpg') },
  { id: '5', src: require('../../assets/images/img1.jpg') },
  { id: '6', src: require('../../assets/images/img2.jpg') },
];

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (width / COLUMN_COUNT) - 20;

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={IMAGES}
        numColumns={COLUMN_COUNT}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Image 
            source={item.src} 
            style={styles.imageBox} 
            resizeMode="cover" 
          />
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Олійник Дмитро Сергійович, BT-22-1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 10 },
  imageBox: { 
    width: ITEM_WIDTH, 
    height: ITEM_WIDTH, 
    margin: 5, 
    borderRadius: 12,
    backgroundColor: '#eee'
  },
  footer: { 
    padding: 12, 
    borderTopWidth: 1, 
    borderColor: '#f0f0f0',
    backgroundColor: '#fff'
  },
  footerText: { textAlign: 'center', fontSize: 11, color: '#adb5bd' }
});