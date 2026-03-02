import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Spinner = styled.div`
  border: 4px solid ${theme.colors.elevated};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  width: ${props => props.size || '32px'};
  height: ${props => props.size || '32px'};
  animation: spin 1s linear infinite;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl};
  width: 100%;
`;

const Loader = ({ size }) => {
  return (
    <Container>
      <Spinner size={size} />
    </Container>
  );
};

export default Loader;
