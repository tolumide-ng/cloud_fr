import React from 'react';
import { commonCardStyles, cardSectionStyles } from './styles';

interface ICardSectionProps {
  children: React.ReactNode;
}

/**
 * Sections for the <Card> component; adds separators between sections. Should be placed inside <Card.Content>
 */
export const CardSection = ({ children }: ICardSectionProps) => (
  <li className="Card__Section Card__Padding" tabIndex={0}>
    <style jsx>{commonCardStyles}</style>
    <style jsx>{cardSectionStyles}</style>
    {children}
  </li>
);
