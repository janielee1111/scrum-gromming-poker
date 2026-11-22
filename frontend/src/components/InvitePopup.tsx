import { buildInviteLink } from '../lib/inviteLink';
import { useRef, useState } from 'react';

export type InvitePopupProps = {
  code: string;
  inviteToken: string;
  roomName?: string;
  origin?: string;
};

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export function InvitePopup({
  code,
  inviteToken,
  roomName,
  origin = window.location.origin,
}: InvitePopupProps) {
  const link = buildInviteLink(origin, code, inviteToken);

  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopyFailed(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Copying was blocked: select the link so the user can copy it by hand.
      inputRef.current?.select();
      setCopyFailed(true);
    }
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-ink/55 p-4">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-title"
        className="flex max-h-[calc(100vh-32px)] w-full max-w-[600px] flex-col gap-[22px] overflow-y-auto rounded-[18px] bg-surface p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h1
              id="invite-title"
              className="text-title font-bold sm:text-[26px]"
            >
              Invite your team
            </h1>
            <p className="text-[15px] leading-normal text-muted">
              Share this link in your team chat. Anyone with it can join{' '}
              {roomName ?? 'this room'}.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            className={`flex size-11 flex-none cursor-pointer items-center justify-center rounded-field bg-page text-ink ${focusRing}`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="invite-link" className="text-sm font-medium">
            Invite link
          </label>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              id="invite-link"
              type="text"
              readOnly
              value={link}
              className="h-[52px] min-w-0 flex-1 rounded-field border border-line-strong bg-page px-3.5 font-mono text-sm text-ink"
            />
            <button
              type="button"
              onClick={copyLink}
              className={`flex h-[52px] flex-none cursor-pointer items-center gap-2 rounded-field bg-primary px-[22px] text-base font-semibold text-surface hover:bg-primary-hover ${focusRing}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <rect
                  x="5"
                  y="5"
                  width="8.5"
                  height="8.5"
                  rx="1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10.5 3V2.5A1 1 0 009.5 1.5h-6a1 1 0 00-1 1v6a1 1 0 001 1H4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          {copyFailed && (
            <p role="alert" className="text-sm text-warning">
              Couldn't copy automatically. The link is selected, so press Ctrl+C
              (or ⌘C on a Mac) to copy it.
            </p>
          )}
        </div>
        {/* Step 4: QR code goes here */}

        <button
          type="button"
          className={`h-[52px] cursor-pointer rounded-field bg-ink text-base font-semibold text-surface ${focusRing}`}
        >
          Done, go to the room
        </button>
      </section>
    </div>
  );
}
