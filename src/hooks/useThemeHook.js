import { useState, useEffect } from 'react';

export function useThemeHook() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    function handleThemeChange(theme) {
      setTheme(theme);
    }
  });

  return theme;
}
