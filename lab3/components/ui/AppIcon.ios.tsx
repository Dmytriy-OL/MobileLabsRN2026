import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';


export function AppIcon({
  name,
  size = 24,
  tint,
  containerStyle,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  tint: string;
  containerStyle?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={tint}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        containerStyle,
      ]}
    />
  );
}