import 'styled-components/native';
import { appLightTheme } from './theme'; 

type CustomAppTheme = typeof appLightTheme;


declare module 'styled-components/native' {
  export interface DefaultTheme extends CustomAppTheme {}
}