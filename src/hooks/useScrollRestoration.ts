import { useCallback, useEffect } from 'react';

export const useScrollRestoration = (key: string) => {
  useEffect(() => {
    const positionY: number = JSON.parse(sessionStorage.getItem(`scrollY@${key}`) || '0');

    window.scrollTo({ top: positionY });
  }, [key]);

  const recordScrollY = useCallback(() => {
    sessionStorage.setItem(`scrollY@${key}`, JSON.stringify(window.scrollY));
  }, [key]);

  return { recordScrollY };
};
