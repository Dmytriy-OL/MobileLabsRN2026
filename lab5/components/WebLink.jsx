import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

export function WebLink({ href, children, style, ...rest }) {
  const handlePress = async (e) => {
    // На мобільних пристроях відкриваємо вбудований браузер замість зовнішнього
    if (Platform.OS !== 'web') {
      e.preventDefault();
      await WebBrowser.openBrowserAsync(href, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
        toolbarColor: '#007AFF',
      });
    }
  };

  return (
    <Link
      {...rest}
      href={href}
      onPress={handlePress}
      style={[{ color: '#007AFF' }, style]}
    >
      {children}
    </Link>
  );
}