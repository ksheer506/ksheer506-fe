import { useCallback, useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = <T extends Element = HTMLDivElement>(
  onIntersecting: () => void
) => {
  const [enabled, setEnabled] = useState(false);
  const bottomRef = useRef<T>(null);

  const initializer = useCallback(() => {
    if (bottomRef.current) return;

    setEnabled(true);
    onIntersecting();
  }, [onIntersecting]);

  useEffect(() => {
    if (!bottomRef.current || !enabled) return;
    const options = {
      rootMargin: '50px',
    };
    const io = new IntersectionObserver(([{ isIntersecting }]) => {
      if (!isIntersecting) return;

      onIntersecting();
    }, options);

    io.observe(bottomRef.current);

    return () => io.disconnect();
  }, [enabled, onIntersecting]);

  return { bottomRef, enabled, initializer };
};
