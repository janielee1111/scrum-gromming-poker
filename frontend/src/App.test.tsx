import { render, screen } from '@testing-library/react';
import { VOTING_CARDS } from '@scrum-grooming-poker/shared';
import { expect, it } from 'vitest';
import App from './App';

it('renders the heading and voting cards', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Scrum Grooming Poker' })).toBeTruthy();
  expect(screen.getByText(`Voting cards: ${VOTING_CARDS.join(', ')}`)).toBeTruthy();
});
