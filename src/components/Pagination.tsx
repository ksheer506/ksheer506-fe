import React, { useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { useRouter } from 'next/router';

const generatePages = (currentPage: number, lastPage: number, size: number) => {
  const start = (Math.ceil(currentPage / size) - 1) * size + 1;
  const end = Math.ceil(currentPage / size) * size;

  if (end > lastPage) {
    return new Array(lastPage - start + 1).fill(0).map((_, i) => start + i);
  }

  return new Array(size).fill(0).map((_, i) => start + i);
};

interface PaginationProps {
  initialPage: number;
  lastPage: number;
  onClick(currentPage: number): void;
  size?: number;
}
const Pagination = ({ lastPage, onClick, initialPage, size = 5 }: PaginationProps) => {
  console.log(initialPage);
  const [current, setCurrent] = useState<number>(initialPage);
  const [pages, setPages] = useState<number[]>(generatePages(initialPage, lastPage, size));

  const handlePrev = () => {
    const first = pages[0];

    if (current >= first && current > 1) {
      setPages(generatePages(current - 1, lastPage, size));
      setCurrent((prev) => prev - 1);

      onClick(current - 1);
    }
  };

  const handleNext = () => {
    const last = pages[pages.length - 1];

    if (current >= lastPage) return;
    if (current >= last) {
      setPages(generatePages(current + 1, lastPage, size));
    }

    setCurrent((prev) => prev + 1);
    onClick(current + 1);
  };
  const handlePageClick = (page: number) => {
    setCurrent(page);
    onClick(page);
  };

  return (
    <Container>
      <Button onClick={handlePrev} disabled={current <= 1}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((page) => (
          <Page
            onClick={() => handlePageClick(page)}
            selected={page === current}
            disabled={page === current}
            key={page}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button onClick={handleNext} disabled={current >= lastPage}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;

  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin: 0 20px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 0px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  width: 40px;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;
