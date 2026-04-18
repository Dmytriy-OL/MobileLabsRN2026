import React from 'react';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

interface OuterLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
}


export function OuterLink({ href, ...props }: OuterLinkProps) {
  const handlePress = async (e: any) => {
    if (Platform.OS !== 'web') {
      e.preventDefault();
      try {
        await WebBrowser.openBrowserAsync(href, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
          toolbarColor: '#4361EE', 
        });
      } catch (error) {
        console.error("Не вдалося відкрити посилання:", error);
      }
    }
  };

  return (
    <Link
      {...props}
      href={href as any}
      onPress={handlePress}
      target={Platform.select({ web: '_blank', default: undefined })}
    />
  );
}