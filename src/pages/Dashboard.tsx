import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterSummary } from "../types/character";
import { CharacterCard } from "../components/CharacterCard";

export function Dashboard() {
  const navigate = useNavigate();

  const [characters] = useState<CharacterSummary[]>([
    {
      id: "1",
      name: "Thorin Ironfist",
      race: "Dwarf",
      class: "Paladin",
      level: 5,
    },
    {
      id: "2",
      name: "Elion Moonwhisper",
      race: "Elf",
      class: "Wizard",
      level: 3,
    },
  ]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>Roll Initiative</h1>
        <button
          style={styles.primaryButton}
          onClick={() => alert("Create New Character modal coming next!")}
        >
          + New Character
        </button>
      </header>

      <main style={{ marginTop: "20px" }}>
        <h2>Your Characters</h2>
        <div style={styles.cardGrid}>
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onClick={(id) => navigate(`/character/${id}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    fontFamily: "sans-serif",
    color: "#1a1a1a",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    borderBottom: "1px solid #e0e0e0",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  },
  primaryButton: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
