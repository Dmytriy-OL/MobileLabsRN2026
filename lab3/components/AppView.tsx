import { View, type ViewProps } from 'react-native';
import { useAppState } from '@/context/AppStatusContext';
import { Palette } from '@/constants/Colors';

export type AppViewProps = ViewProps & {
  variant?: 'primary' | 'surface' | 'transparent';
};


export function AppView({ style, variant = 'primary', ...props }: AppViewProps) {
  const { isDark } = useAppState();
  const theme = isDark ? Palette.dark : Palette.light;

  const getBackgroundColor = () => {
    switch (variant) {
      case 'surface':
        return theme.surface;
      case 'transparent':
        return 'transparent';
      default:
        return theme.background;
    }
  };

  return (
    <View 
      style={[
        { backgroundColor: getBackgroundColor() }, 
        style
      ]} 
      {...props} 
    />
  );
}