import React, { useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { usePagination } from '../hooks';

interface PaginationProps {
  currentPage?: number;
  lastPage: number;
  onChange(currentPage: number): void;
  size?: number;
}
const Pagination = ({ lastPage, onChange, currentPage, size = 5 }: PaginationProps) => {
  const { pages, setPrev, setNext, setPage } = usePagination({
    currentPage,
    size,
    lastPage,
    onChange,
  });

  return (
    <Container>
      <Button onClick={setPrev} disabled={!!currentPage && pages[0] <= 1}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pages.map((page) => (
          <Page
            onClick={() => setPage(page)}
            selected={page === currentPage}
            disabled={page === currentPage}
            key={page}
          >
            {page}
          </Page>
        ))}
      </PageWrapper>
      <Button onClick={setNext} disabled={!!currentPage && pages[pages.length - 1] >= lastPage}>
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
