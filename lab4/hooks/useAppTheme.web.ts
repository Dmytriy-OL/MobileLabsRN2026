import { useEffect, useState } from 'react';
import { useColorScheme as useSystemScheme } from 'react-native';

export function useAppTheme() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const systemScheme = useSystemScheme();

  if (isMounted) {
    return systemScheme ?? 'light';
  }

  return 'light';
}