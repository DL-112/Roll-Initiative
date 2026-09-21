import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterSummary } from "../types/character";
import { CharacterCard } from "../components/CharacterCard";
import { loadCharacters, deleteCharacter } from "../services/storage";

export function Dashboard() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<CharacterSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshCharacters = async () => {
    try {
      setIsLoading(true);
      const data = await loadCharacters();
      setCharacters(data);
    } catch (err) {
      console.error("Failed to load characters:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCharacters();
  }, []);

  const handleDeleteCharacter = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this character?",
    );
    if (!confirmDelete) return;

    try {
      await deleteCharacter(id);
      await refreshCharacters(); // Refresh list after deletion
    } catch (err) {
      alert(
        `Failed to delete character: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>Roll Initiative</h1>
        <button
          style={styles.primaryButton}
          onClick={() => navigate("/create")}
        >
          + New Character
        </button>
      </header>

      <main style={{ marginTop: "20px" }}>
        <h2>Your Characters</h2>

        {isLoading ? (
          <p>Loading characters from file system...</p>
        ) : characters.length === 0 ? (
          <p style={{ color: "#666" }}>
            No characters found in storage. Click "+ New Character" to create
            one!
          </p>
        ) : (
          <div style={styles.cardGrid}>
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                onClick={(id) => navigate(`/character/${id}`)}
                onDelete={handleDeleteCharacter}
              />
            ))}
          </div>
        )}
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
