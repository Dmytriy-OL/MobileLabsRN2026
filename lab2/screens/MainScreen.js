import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { initialNews, generateMoreNews } from '../data/newsData';

export default function MainScreen({ navigation }) {
  const [data, setData] = useState(initialNews);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLowerLoading, setIsLowerLoading] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(initialNews);
      setIsRefreshing(false);
    }, 1200);
  }, []);

  const handleLoadMore = () => {
    if (isLowerLoading) return;
    setIsLowerLoading(true);
    setTimeout(() => {
      const nextBatch = generateMoreNews(data.length, 4);
      setData(prev => [...prev, ...nextBatch]);
      setIsLowerLoading(false);
    }, 1000);
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.newsCard}
      onPress={() => navigation.navigate('DetailsScreen', { ...item })}
    >
      <ImageBackground source={{ uri: item.image }} style={styles.cardBg} imageStyle={{ borderRadius: 15 }}>
        <View style={styles.overlay}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc} numberOfLines={1}>{item.description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        renderItem={renderNewsItem}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3} 
        ListHeaderComponent={() => <Text style={styles.mainHeader}>Головні події</Text>}
        ListFooterComponent={() => isLowerLoading && <ActivityIndicator style={{margin: 20}} color="#6366f1" />}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f1f5f9' },
  mainHeader: { fontSize: 32, fontWeight: '900', padding: 20, color: '#1e293b' },
  newsCard: { height: 200, marginHorizontal: 20, marginBottom: 20, elevation: 5 },
  cardBg: { width: '100%', height: '100%' },
  overlay: { 
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'flex-end', padding: 15, borderRadius: 15 
  },
  cardTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  cardDesc: { color: '#cbd5e1', fontSize: 14 }
});