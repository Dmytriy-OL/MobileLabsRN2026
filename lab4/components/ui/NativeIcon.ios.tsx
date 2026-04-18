import React from 'react';
import { SymbolView, type SymbolViewProps, type SymbolWeight } from 'expo-symbols';
import { type StyleProp, type ViewStyle } from 'react-native';


interface IconProps {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}

export const NativeIcon = ({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: IconProps) => {
  const iconDimensions = {
    width: size,
    height: size,
  };

  return (
    <SymbolView
      name={name}
      tintColor={color}
      weight={weight}
      resizeMode="scaleAspectFit"
      style={[iconDimensions, style]}
    />
  );
};