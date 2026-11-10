import { useState, type SubmitEvent } from 'react';
import { DECKS, DEFAULT_DECK, type DeckType } from '@scrum-grooming-poker/shared';
import { TextField } from './ui/TextField';
import { Button } from './ui/Button';

const deckTypes = Object.keys(DECKS) as DeckType[];

export type CreateRoomInput = { roomName: string; deck: DeckType };

type Props = {
  onSubmit: (input: CreateRoomInput) => Promise<void>;
};

export function CreateRoomForm({ onSubmit }: Props) {
    const [roomName, setRoomName] = useState('');
    const [deck, setDeck] = useState<DeckType>(DEFAULT_DECK);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const trimmedName = roomName.trim();
    const canSubmit = trimmedName.length > 0 && !submitting;

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!canSubmit) return;
        
        setSubmitting(true);
        setError(null);
        try{
            await onSubmit({ roomName: trimmedName, deck });
        } catch {
            setError("Couldn't create the room. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextField
                id="room-name"
                label="Room name"
                placeholder="Sprint 24 refinement"
                autoComplete="off"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-medium">Card deck</legend>
                <div className="flex gap-2">
                    {deckTypes.map((type) => (
                        <label 
                            key={type} 
                            className="flex h-12 flex-1 cursor-pointer items-center gap-2.5 rounded-field
                            border border-line-strong px-3.5 text-base
                            has-checked:border-2 has-checked:border-primary has-checked:bg-primary-soft
                            has-checked:font-medium
                            has-focus-visible:outline-2 has-focus-visible:outline-primary"
                        >
                            <input
                                type="radio"
                                name="deck"
                                value={type}
                                checked={deck === type}
                                onChange={() => setDeck(type)}
                                className="accent-primary"
                            />
                        {DECKS[type].label}
                        </label>
                    ))}
                </div>
                <p className="font-mono text-sm text-muted">{DECKS[deck].cards.join(' · ')}</p>
            </fieldset>
            <Button type="submit" disabled={!canSubmit} aria-busy={submitting}>{submitting ? 'Creating…' : 'Create room'}</Button>
            {error && (
                <p
                role="alert"
                className="rounded-field border border-warning-line bg-warning-soft px-3.5 py-2.5
                    text-sm text-warning-ink"
                >
                {error}
                </p>
            )}
        </form>
    );
}