/* eslint-disable react/display-name */
import { ChangeEvent, forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface InputProps {
  label: string;
  type?: 'text' | 'password';
  error: boolean;
  errMsg: string;
  onBlur(e: ChangeEvent<HTMLInputElement>): void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', error, errMsg, onBlur }, ref) => {
    return (
      <InputBox>
        <InputLabel>{label}</InputLabel>
        <TextInput type={type} isError={error} onBlur={onBlur} ref={ref} />
        {error && <ErrorMsg>{errMsg}</ErrorMsg>}
      </InputBox>
    );
  }
);

const InputBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6c6c7d;
`;

const TextInput = styled.input<{ isError: boolean }>`
  border: 1px solid #000;
  padding: 16px;
  background-color: #f7f7fa;
  border-radius: 12px;

  ${({ isError }) =>
    isError &&
    css`
      background-color: #fdedee;
    `}
`;

const ErrorMsg = styled.p`
  font-weight: 400;
  font-size: 13px;
  color: #ed4e5c;
`;
