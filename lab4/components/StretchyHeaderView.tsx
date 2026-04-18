import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

// 1. Виправлено аліаси з @/ на ~/ та назву компонента
import { SurfaceView } from "~/components/SurfaceView";
import { useAppTheme } from "~/hooks/useAppTheme";

const MAX_HEADER_HEIGHT = 220; 

interface StretchyProps extends PropsWithChildren {
  topElement: ReactElement;
  bgColors: { dark: string; light: string };
}

export default function StretchyHeaderView({
  children,
  topElement,
  bgColors,
}: StretchyProps) {
  // 2. Використовуємо новий хук. Він повертає "light" або "dark"
  const theme = useAppTheme();
  const scrollReference = useAnimatedRef<Animated.ScrollView>();
  const offset = useScrollViewOffset(scrollReference);

  const animatedHeaderTransform = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            offset.value,
            [-MAX_HEADER_HEIGHT, 0, MAX_HEADER_HEIGHT],
            [-MAX_HEADER_HEIGHT / 1.5, 0, MAX_HEADER_HEIGHT * 0.5],
          ),
        },
        {
          scale: interpolate(
            offset.value,
            [-MAX_HEADER_HEIGHT, 0],
            [1.8, 1],
            "clamp",
          ),
        },
      ],
    };
  });

  return (
    <View style={ui.root}>
      <Animated.ScrollView
        ref={scrollReference}
        scrollEventThrottle={16}
        contentContainerStyle={ui.scrollContent}
      >
        <Animated.View
          style={[
            ui.headerContainer,
            // 3. Додано приведення типу as keyof typeof bgColors, щоб TS не сварився
            { backgroundColor: bgColors[theme as keyof typeof bgColors] },
            animatedHeaderTransform,
          ]}
        >
          {topElement}
        </Animated.View>
        
        {/* Замість ThemedView тепер SurfaceView */}
        <SurfaceView style={ui.body}>{children}</SurfaceView>
      </Animated.ScrollView>
    </View>
  );
}

const ui = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    height: MAX_HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  body: {
    flex: 1,
    padding: 24,
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    marginTop: -20, 
    gap: 12,
  },
});