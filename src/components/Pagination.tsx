import React, { useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

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

interface PaginationProps {
  currentPage?: number;
  lastPage: number;
  onChange(currentPage: number): void;
  size?: number;
}
const Pagination = ({ lastPage, onChange, currentPage, size = 5 }: PaginationProps) => {
  const [pages, setPages] = useState<number[]>(generatePages(currentPage || 1, size));

  const handlePrev = () => {
    if (!currentPage) return;

    const first = pages[0];

    setPages(generatePages(first - size, size, first - 1));
    onChange(first - 1);
  };

  const handleNext = () => {
    if (!currentPage) return;

    const last = pages[pages.length - 1];
    const lastIndex = last + size > lastPage ? lastPage : last + size;

    setPages(generatePages(last + 1, size, lastIndex));
    onChange(last + 1);
  };

  const handlePageClick = (page: number) => {
    onChange(page);
  };

  return (
    <Container>
      <Button onClick={handlePrev} disabled={!!currentPage && pages[0] <= 1}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((page) => (
          <Page
            onClick={() => handlePageClick(page)}
            selected={page === currentPage}
            disabled={page === currentPage}
            key={page}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button onClick={handleNext} disabled={!!currentPage && pages[pages.length - 1] >= lastPage}>
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
