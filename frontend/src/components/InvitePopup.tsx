export type InvitePopupProps = {
  code: string;
  inviteToken: string;
  roomName?: string;
};

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export function InvitePopup({ roomName }: InvitePopupProps) {
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

        {/* Step 3: link field and Copy button go here */}
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
