import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { type StyleProp, type TextStyle } from 'react-native';


const ICON_MAP = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'folder': 'folder-outline',
  'document-text': 'file-document-outline',
  'trash-outline': 'delete-outline',
  'information-circle-outline': 'information-outline',
  'plus': 'plus',
} as const;

type IconName = keyof typeof ICON_MAP;

interface UniversalIconProps {
  name: IconName;
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
}

export const NativeIcon = ({
  name,
  size = 24,
  color,
  style,
}: UniversalIconProps) => {
  const glyphName = ICON_MAP[name] || 'help-circle-outline';

  return (
    <MaterialCommunityIcons 
      name={glyphName as any} 
      size={size} 
      color={color} 
      style={style} 
    />
  );
};