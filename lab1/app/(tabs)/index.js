import React from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView, View } from 'react-native';
import ArticleItem from '../../src/components/ArticleItem';

const NEWS_DATA = [
  { 
    id: '1', 
    title: 'Оновлення кампусу', 
    date: '15 Квітня', 
    desc: 'Університет відкриває нову зону для коворкінгу студентів ІТ.', 
    image: require('../../assets/images/img1.jpg') 
  },
  { 
    id: '2', 
    title: 'React Native 2026', 
    date: '12 Квітня', 
    desc: 'Нові можливості розробки кросплатформених додатків вражають швидкістю.', 
    image: require('../../assets/images/img2.jpg') 
  },
  { 
    id: '3', 
    title: 'Хакатон Житомира', 
    date: '10 Квітня', 
    desc: 'Команда нашої кафедри посіла перше місце у змаганнях з розробки ботів.', 
    image: require('../../assets/images/img1.jpg') 
  },
  { 
    id: '4', 
    title: 'Стипендії', 
    date: '08 Квітня', 
    desc: 'Опубліковано оновлені списки на отримання академічних виплат.', 
    image: require('../../assets/images/img2.jpg') 
  },
];

export default function NewsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={NEWS_DATA}
        ListHeaderComponent={<Text style={styles.header}>Стрічка новин</Text>}
        
        renderItem={({ item }) => (
          <ArticleItem 
            heading={item.title} 
            publishedAt={item.date} 
            summary={item.desc}
            coverImage={item.image} 
          />
        )}
        
        keyExtractor={item => item.id}
        
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Олійник Дмитро Сергійович, BT-22-1</Text>
          </View>
        }
        
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: '800', 
    padding: 20, 
    color: '#1a1a1a' 
  },
  listContent: { 
    paddingBottom: 40 
  },
  footerContainer: { 
    padding: 20, 
    backgroundColor: '#fff', 
    borderTopWidth: 1, 
    borderColor: '#eee',
    marginTop: 20
  },
  footerText: { 
    textAlign: 'center', 
    fontSize: 12, 
    color: '#888', 
    fontStyle: 'italic' 
  }
});