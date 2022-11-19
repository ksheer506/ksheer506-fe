import { useCallback, useEffect, useRef, useState } from 'react';

interface useInfiniteScrollProps {
  onIntersecting(): void;
  coolTime?: number;
}

/**
 * @param onIntersecting 관찰하는 요소와 겹칠 때 실행할 함수
 * @param coolTime onIntersecting이 실행되는 최소 시간 간격(ms)을 설정
 */
export const useInfiniteScroll = <T extends Element = HTMLDivElement>({
  onIntersecting,
  coolTime = 50,
}: useInfiniteScrollProps) => {
  const [enabled, setEnabled] = useState(false);
  const bottomRef = useRef<T>(null);
  const prevTime = useRef(0);

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
    const io = new IntersectionObserver(([{ isIntersecting, time }]) => {
      if (!isIntersecting || time - prevTime.current < coolTime) return;

      onIntersecting();
      prevTime.current = time;
    }, options);

    io.observe(bottomRef.current);

    return () => io.disconnect();
  }, [enabled, coolTime, onIntersecting]);

  return { bottomRef, enabled, initializer };
};
