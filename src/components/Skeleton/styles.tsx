import styled, { css } from 'styled-components';

import { blink, wave } from './animation';
import { SkeletonProps } from './Skeleton';

export type SkeletonDefaultProps = Omit<SkeletonProps, 'children'>;

export const Skelcontainer = styled.div<SkeletonDefaultProps>`
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  row-gap: 5px;
  justify-content: center;

  ${({ width, height }) =>
    width &&
    height &&
    css`
      width: ${width};
      height: ${height};
    `}
`;

export const SkelItemDefault = styled.div<SkeletonDefaultProps>`
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
  animation: ${blink} 0.5s ease infinite;
`;
