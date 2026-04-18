import { Colors } from "~/constants/theme";
import { useAppTheme } from "./useAppTheme";

type ColorKeys = keyof typeof Colors.light;

export function useThemeManager(
  customProps: { light?: string; dark?: string },
  colorKey: ColorKeys
) {
  const activeTheme = useAppTheme();
  
  const overrideColor = customProps[activeTheme as keyof typeof customProps];

  if (overrideColor) {
    return overrideColor;
  }

  return Colors[activeTheme as keyof typeof Colors][colorKey];
}