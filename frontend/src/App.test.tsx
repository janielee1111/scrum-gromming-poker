import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import App from './App';

it('renders the home page session options', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', {
      name: 'Estimate together, without anchoring',
    }),
  ).toBeTruthy();
  expect(screen.getByRole('region', { name: 'Start a session' })).toBeTruthy();
  expect(screen.getByRole('region', { name: 'Join a session' })).toBeTruthy();
});
