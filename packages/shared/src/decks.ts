export const DECKS = {
    fibonacci: {
        label: 'Fibonacci',
        cards: ['0', '1', '2', '3', '5', '8', '13', '21', '?', 'break']
    },
    thisrt: {
        label: 'T-shirt sizes',
        cards: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '?', 'break']
    }
} as const;

export type DeckType = keyof typeof DECKS;

export const DEFAULT_DECK: DeckType = 'fibonacci';