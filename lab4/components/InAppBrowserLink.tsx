import { Link, type Href } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform } from 'react-native';



interface WebLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  href: Href;
}

export const InAppBrowserLink = ({ href, ...props }: WebLinkProps) => {
  const handleLinkPress = async (e: any) => {
    if (Platform.OS !== 'web') {
      e.preventDefault();
      
      const targetUrl = typeof href === 'string' ? href : (href as any).pathname;
      
      if (targetUrl) {
        await WebBrowser.openBrowserAsync(targetUrl, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
          controlsColor: '#007AFF',
        });
      }
    }
  };

  return (
    <Link
      {...props}
      href={href}
      target="_blank"
      onPress={handleLinkPress}
    />
  );
};