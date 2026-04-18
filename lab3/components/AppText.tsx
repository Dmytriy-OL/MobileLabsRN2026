import { StyleSheet, Text, type TextProps } from 'react-native';
import { useAppState } from '@/context/AppStatusContext';
import { Palette } from '@/constants/Colors';

export type AppTextProps = TextProps & {
  variant?: 'body' | 'header' | 'semi' | 'caption' | 'anchor';
};


export function AppText({
  style,
  variant = 'body',
  ...props
}: AppTextProps) {
  const { isDark } = useAppState();
  const theme = isDark ? Palette.dark : Palette.light;

  const getVariantStyle = () => {
    switch (variant) {
      case 'header': return styles.header;
      case 'semi': return styles.semi;
      case 'caption': return styles.caption;
      case 'anchor': return [styles.anchor, { color: theme.accent }];
      default: return styles.body;
    }
  };

  return (
    <Text
      style={[
        { color: theme.text },
        getVariantStyle(),
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
  semi: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  header: {
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  caption: {
    fontSize: 20,
    fontWeight: '800',
  },
  anchor: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});