import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 260;

export default function ParallaxWrapper({ children, headerComponent, headerBg = '#f0f0f0' }) {
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);

  // Ефект паралаксу та масштабування при скролі
  const headerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.8]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value, 
            [-IMG_HEIGHT, 0], 
            [2, 1], 
            'clamp'
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.mainContainer}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.headerBox, { backgroundColor: headerBg }, headerStyle]}>
          {headerComponent}
        </Animated.View>
        <View style={styles.bodyContent}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBox: {
    height: IMG_HEIGHT,
    width: width,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContent: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25, // Наповзання контенту на шапку
  },
});