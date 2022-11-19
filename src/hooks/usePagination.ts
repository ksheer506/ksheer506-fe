import { useEffect, useRef, useState } from 'react';

function generatePages(currentPage: number, size: number, lastPage: number): number[];
function generatePages(currentPage: number, size: number): number[];

function generatePages(currentPage: number, size: number, lastPage?: number) {
  const start = (Math.ceil(currentPage / size) - 1) * size + 1;
  const end = Math.ceil(currentPage / size) * size;

  if (lastPage && end > lastPage) {
    return new Array(lastPage - start + 1).fill(0).map((_, i) => start + i);
  }

  return new Array(size).fill(0).map((_, i) => start + i);
}

interface usePaginationProps {
  currentPage?: number;
  size: number;
  lastPage: number;
  onChange(currentPage: number): void;
}

export const usePagination = ({ currentPage, size, lastPage, onChange }: usePaginationProps) => {
  const initialPage = useRef<number | undefined>(currentPage);
  const [pages, setPages] = useState<number[]>(generatePages(currentPage || 1, size));

  // FIXME: pagination 클릭해서 들어온 후 다시 주소창 입력해서 페이지 전환할 경우 lastPage가 제대로 적용되지 않음
  // 주소창에서 직접 페이지를 변경했을 때 해당 페이지가 표시되지 않는 문제 처리
  useEffect(() => {
    const { current } = initialPage;

    if (current || !currentPage) return;
    
    setPages(generatePages(currentPage, size, lastPage));
  }, [currentPage, lastPage, size]);

  const setPrev = () => {
    if (!currentPage) return;

    const first = pages[0];

    setPages(generatePages(first - size, size, first - 1));
    onChange(first - 1);
  };

  const setNext = () => {
    if (!currentPage) return;

    const last = pages[pages.length - 1];
    const lastIndex = last + size > lastPage ? lastPage : last + size;

    setPages(generatePages(last + 1, size, lastIndex));
    onChange(last + 1);
  };

  const setPage = (page: number) => {
    onChange(page);
  };

  return { pages, setPrev, setNext, setPage };
};
