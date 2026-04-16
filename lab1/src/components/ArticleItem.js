import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ArticleItem = ({ heading, publishedAt, summary, coverImage }) => {
  return (
    <View style={styles.itemWrapper}>
      {/* Якщо немає картинки, покаже сірий квадрат */}
      <Image source={coverImage ? coverImage : null} style={styles.thumb} />
      <View style={styles.textBlock}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.date}>{publishedAt}</Text>
        <Text numberOfLines={2} style={styles.shortInfo}>{summary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  thumb: { width: 85, height: 85, borderRadius: 10, backgroundColor: '#e9ecef' },
  textBlock: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },
  heading: { fontWeight: 'bold', fontSize: 16, color: '#212529' },
  date: { color: '#adb5bd', fontSize: 11, textTransform: 'uppercase', marginVertical: 4 },
  shortInfo: { color: '#495057', fontSize: 13, lineHeight: 18 },
});

export default ArticleItem;