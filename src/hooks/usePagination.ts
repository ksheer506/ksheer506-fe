import { useState } from 'react';

function generatePages(currentPage: number, lastPage: number, size: number): number[];
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
  const [pages, setPages] = useState<number[]>(generatePages(currentPage || 1, size));

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
