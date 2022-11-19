import { useCallback, useEffect, useRef, useState } from 'react';

interface useInfiniteScrollProps {
  onIntersecting(): void;
  coolTime?: number;
  initializeOnMount?: boolean;
}

/**
 * @param onIntersecting 관찰하는 요소와 겹칠 때 실행할 함수
 * @param coolTime onIntersecting이 실행되는 최소 시간 간격(ms)을 설정
 */
export const useInfiniteScroll = <T extends Element = HTMLDivElement>({
  onIntersecting,
  coolTime = 50,
  initializeOnMount = true,
}: useInfiniteScrollProps) => {
  const [enabled, setEnabled] = useState(initializeOnMount);
  const bottomRef = useRef<T>(null);
  const ioRef = useRef<IntersectionObserver>(null);
  const prevTime = useRef(0);

  const initialize = useCallback(() => {
    if (initializeOnMount) return;

    setEnabled(true);
    onIntersecting();
  }, [initializeOnMount, onIntersecting]);

  const terminate = useCallback(() => {
    if (!ioRef.current) return;

    const io = ioRef.current;
    io.disconnect();
  }, []);

  useEffect(() => {
    if (!bottomRef.current || !enabled) return;
    const options = {
      rootMargin: '50px',
    };
    const io = new IntersectionObserver(([{ isIntersecting, time }]) => {
      // body 하단에서 intersection 이벤트가 무한히 발생하지 않도록
      if (!isIntersecting || time - prevTime.current < coolTime) return;

      onIntersecting();
      prevTime.current = time;
    }, options);

    io.observe(bottomRef.current);

    return () => io.disconnect();
  }, [enabled, coolTime, onIntersecting]);

  return { bottomRef, enabled, initialize, terminate };
};
