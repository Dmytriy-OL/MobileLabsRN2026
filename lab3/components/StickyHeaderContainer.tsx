import React, { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useAppState } from '@/context/AppStatusContext';
import { Palette } from '@/constants/Colors';

const MAX_HEADER_HEIGHT = 220; 

type HeaderProps = PropsWithChildren<{
  headerNode: ReactElement;
  headerColor?: { dark: string; light: string };
}>;

export default function StickyHeaderContainer({
  children,
  headerNode,
  headerColor,
}: HeaderProps) {
  const { isDark } = useAppState();
  const theme = isDark ? Palette.dark : Palette.light;
  
  const scrollTracker = useAnimatedRef<Animated.ScrollView>();
  const scrollPosition = useScrollViewOffset(scrollTracker);

  const headerAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollPosition.value,
            [-MAX_HEADER_HEIGHT, 0, MAX_HEADER_HEIGHT],
            [-MAX_HEADER_HEIGHT / 1.5, 0, MAX_HEADER_HEIGHT * 0.5]
          ),
        },
        {
          scale: interpolate(
            scrollPosition.value, 
            [-MAX_HEADER_HEIGHT, 0, MAX_HEADER_HEIGHT], 
            [1.5, 1, 0.9] 
          ),
        },
      ],
      opacity: interpolate(
        scrollPosition.value,
        [0, MAX_HEADER_HEIGHT * 0.8],
        [1, 0.3] 
      ),
    };
  });

  return (
    <View style={[styles.main, { backgroundColor: theme.background }]}>
      <Animated.ScrollView
        ref={scrollTracker}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.banner,
            { 
              backgroundColor: headerColor ? (isDark ? headerColor.dark : headerColor.light) : theme.accent 
            },
            headerAnimation,
          ]}>
          {headerNode}
        </Animated.View>
        
        <View style={[styles.body, { backgroundColor: theme.background }]}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  banner: {
    height: MAX_HEADER_HEIGHT,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    marginTop: -25, 
  },
});