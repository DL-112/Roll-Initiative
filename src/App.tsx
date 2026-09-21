import { HashRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { CharacterSheet } from "./pages/CharacterSheet";
import { CreateCharacter } from "./pages/CreateCharacter";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateCharacter />} />
        <Route path="/character/:id" element={<CharacterSheet />} />
      </Routes>
    </HashRouter>
  );
}
