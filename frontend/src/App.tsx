import { InvitePopup } from './components/InvitePopup';
import { HomePage } from './pages/HomePage';

export default function App() {
  return (
    <>
      <HomePage />
      <InvitePopup
        code="AB3-K9X"
        inviteToken="demo-token"
        roomName="Sprint 42"
      />
    </>
  );
}
