import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { InvitePopup, type InvitePopupProps } from './InvitePopup';

afterEach(() => {
  cleanup();
});

function renderPopup(props: Partial<InvitePopupProps> = {}) {
  const onClose = vi.fn();
  const onDone = vi.fn();
  render(
    <InvitePopup
      code="ab3-k9x"
      inviteToken="Xq7fR2mLp9vA4kT8wZc1Ne"
      origin="https://scrumpoker.app"
      roomName="Sprint 24 refinement"
      onClose={onClose}
      onDone={onDone}
      {...props}
    />,
  );
  return { onClose, onDone };
}

const LINK = 'https://scrumpoker.app/r/ab3-k9x#t=Xq7fR2mLp9vA4kT8wZc1Ne';

function mockClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
}

describe('InvitePopup', () => {
  it('shows the invite link in a read-only field', () => {
    renderPopup();
    const field = screen.getByLabelText('Invite link') as HTMLInputElement;
    expect(field.value).toBe(LINK);
    expect(field.readOnly).toBe(true);
  });

  it('shows a QR code', () => {
    renderPopup();
    screen.getByRole('img', { name: 'QR code for the invite link' });
  });

  it('names the room in the subtitle', () => {
    renderPopup();
    screen.getByText(/can join Sprint 24 refinement\./);
  });

  it('says "this room" when there is no room name', () => {
    renderPopup({ roomName: undefined });
    screen.getByText(/can join this room\./);
  });

  it('copies the link and says "Copied"', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    renderPopup();

    fireEvent.click(screen.getByRole('button', { name: /^copy$/i }));

    await screen.findByRole('button', { name: /^copied$/i });
    expect(writeText).toHaveBeenCalledWith(LINK);
  });

  it('selects the link and shows a message when copying is blocked', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('blocked')));
    renderPopup();

    fireEvent.click(screen.getByRole('button', { name: /^copy$/i }));

    await screen.findByRole('alert');
    const field = screen.getByLabelText('Invite link') as HTMLInputElement;
    expect(field.selectionStart).toBe(0);
    expect(field.selectionEnd).toBe(LINK.length);
  });
  it('calls onClose when the close button is clicked', () => {
    const { onClose, onDone } = renderPopup();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onDone).not.toHaveBeenCalled();
  });

  it('calls onDone with the room code when Done is clicked', () => {
    const { onClose, onDone } = renderPopup();

    fireEvent.click(
      screen.getByRole('button', { name: /done, go to the room/i }),
    );

    expect(onDone).toHaveBeenCalledWith('ab3-k9x');
    expect(onClose).not.toHaveBeenCalled();
  });
});
