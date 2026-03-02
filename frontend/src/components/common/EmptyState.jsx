import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxxl};
  text-align: center;
  color: ${theme.colors.textSecondary};
  background-color: ${theme.colors.cardBackground};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.border};
  width: 100%;
`;

const Icon = styled.div`
  font-size: ${theme.typography.fontSize.display};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.primary};
  opacity: 0.8;
`;

const Title = styled.h3`
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const Message = styled.p`
  margin-bottom: ${theme.spacing.lg};
  max-width: 400px;
`;

const ActionButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.cardBackground};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: all 0.2s;
  
  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
`;

const EmptyState = ({ icon, title, message, actionLabel, onAction }) => {
  return (
    <Container>
      {icon && <Icon>{icon}</Icon>}
      {title && <Title>{title}</Title>}
      {message && <Message>{message}</Message>}
      {actionLabel && onAction && (
        <ActionButton onClick={onAction}>{actionLabel}</ActionButton>
      )}
    </Container>
  );
};

export default EmptyState;
