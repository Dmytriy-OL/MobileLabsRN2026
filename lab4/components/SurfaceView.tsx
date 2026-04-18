import { useThemeManager } from "~/hooks/useThemeManager"; 
import { SafeAreaView, View, type ViewProps } from "react-native";

export interface SurfaceProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
  useSafeArea?: boolean;
}

export const SurfaceView = ({
  style,
  lightColor,
  darkColor,
  useSafeArea = false,
  ...props
}: SurfaceProps) => {
  const bg = useThemeManager( 
    { light: lightColor, dark: darkColor },
    "background"
  );

  const Container = useSafeArea ? SafeAreaView : View;

  return <Container style={[{ backgroundColor: bg }, style]} {...props} />;
};