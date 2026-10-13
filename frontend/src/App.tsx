import { VOTING_CARDS } from '@scrum-grooming-poker/shared';

function App() {
  return (
    <>
      <h1>Scrum Grooming Poker</h1>
      <p>Voting cards: {VOTING_CARDS.join(', ')}</p>
    </>
  );
}

export default App;
