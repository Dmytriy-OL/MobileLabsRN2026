import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

const ICON_MAP = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.right': 'chevron-right',
  'game-controller': 'videogame-asset',
  'list.bullet': 'list',
  'gear': 'settings',
} as Record<string, ComponentProps<typeof MaterialIcons>['name']>;

type AppIconName = keyof typeof ICON_MAP;

export function AppIcon({
  name,
  size = 24,
  tint,
  style,
}: {
  name: AppIconName;
  size?: number;
  tint: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  const iconName = ICON_MAP[name] || 'help-outline';
  
  return (
    <MaterialIcons 
      color={tint} 
      size={size} 
      name={iconName} 
      style={style} 
    />
  );
}