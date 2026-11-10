import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { TextField } from '../components/ui/TextField';
import { CreateRoomForm, type CreateRoomInput } from '../components/CreateRoomForm';

async function handleCreateRoom(input: CreateRoomInput){
  console.log('Create room:', input);
  await new Promise((resolve) => setTimeout(resolve, 800));
}

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-line bg-surface px-5 py-4 sm:px-10 sm:py-5">
        <div className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <rect
              x="3"
              y="5"
              width="14"
              height="19"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="11"
              y="3"
              width="14"
              height="19"
              rx="3"
              className="fill-primary"
            />
          </svg>
          <span className="text-lg font-bold">Scrum Poker</span>
        </div>
        <span className="text-sm text-muted">No sign-up needed</span>
      </header>
      <main className="flex flex-1 flex-col items-center gap-10 px-4 py-10 sm:px-6 sm:py-18">
        <div className="flex max-w-160 flex-col gap-3 text-center">
          <h1 className="text-4xl font-bold sm:text-display">
            Estimate together, without anchoring
          </h1>
          <p className="text-lg text-muted">
            Votes stay hidden until the facilitator reveals them. Walk through
            every ticket and leave with the estimates exported.
          </p>
        </div>

        <div className="flex w-full max-w-220 flex-wrap justify-center gap-6">
          <Card aria-labelledby="start-heading">
            <div className="flex flex-col gap-1">
              <h2 id="start-heading" className="text-title font-semibold">
                Start a session
              </h2>
              <p className="text-base text-muted">You'll be the facilitator.</p>
            </div>
            <CreateRoomForm onSubmit={handleCreateRoom} />
          </Card>

          <Card aria-labelledby="join-heading">
            <div className="flex flex-col gap-1">
              <h2 id="join-heading" className="text-title font-semibold">
                Join a session
              </h2>
              <p className="text-base text-muted">
                Rooms are invite-only. Paste the link your facilitator shared.
              </p>
            </div>

            <TextField
              id="invite"
              label="Invite link"
              placeholder="https://…/r/ab3-k9x#t=…"
              disabled
            />
            <Button variant="secondary" disabled aria-describedby="join-soon">
              Join room
            </Button>
            <p id="join-soon" className="text-sm text-muted">
              Coming soon. For now, open the invite link directly.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
