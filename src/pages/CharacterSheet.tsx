import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Character } from "../types/character";
import { loadCharacterById } from "../services/storage";

export function CharacterSheet() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCharacter() {
      if (!id) return;
      setIsLoading(true);
      const data = await loadCharacterById(id);
      setCharacter(data);
      setIsLoading(false);
    }
    fetchCharacter();
  }, [id]);

  // Helper to calculate standard D&D 5e ability score modifiers
  const getModifier = (score: number): string => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <p>Loading character sheet...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div style={styles.container}>
        <button style={styles.secondaryButton} onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>
        <p style={{ marginTop: "20px", color: "#ef4444" }}>
          Character not found!
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button style={styles.secondaryButton} onClick={() => navigate("/")}>
          ← Dashboard
        </button>
        <h1 style={{ margin: 0 }}>{character.name}</h1>
      </header>

      {/* Basic Profile Summary Bar */}
      <div style={styles.profileSummary}>
        <div style={styles.summaryItem}>
          <span style={styles.summaryLabel}>Class & Level</span>
          <span style={styles.summaryValue}>
            {character.class} (Lvl {character.level})
          </span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryLabel}>Race</span>
          <span style={styles.summaryValue}>{character.race}</span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryLabel}>Background</span>
          <span style={styles.summaryValue}>
            {character.background || "N/A"}
          </span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryLabel}>Alignment</span>
          <span style={styles.summaryValue}>
            {character.alignment || "N/A"}
          </span>
        </div>
      </div>

      {/* Ability Scores Grid */}
      <section style={styles.section}>
        <h2 style={{ marginTop: 0 }}>Ability Scores</h2>
        <div style={styles.statsGrid}>
          {character.stats ? (
            (
              Object.keys(character.stats) as Array<
                keyof typeof character.stats
              >
            ).map((stat) => {
              const score = character.stats[stat];
              return (
                <div key={stat} style={styles.statCard}>
                  <span style={styles.statName}>{stat}</span>
                  <span style={styles.statModifier}>{getModifier(score)}</span>
                  <span style={styles.statScore}>Score: {score}</span>
                </div>
              );
            })
          ) : (
            <p style={{ color: "#666" }}>
              No ability scores recorded for this character.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    fontFamily: "sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
    color: "#1a1a1a",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e0e0e0",
  },
  secondaryButton: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  profileSummary: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: "16px 24px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5",
    marginTop: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
  },
  summaryItem: {
    display: "flex",
    flexDirection: "column" as const,
  },
  summaryLabel: {
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase" as const,
    fontWeight: "bold",
  },
  summaryValue: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "4px",
  },
  section: {
    marginTop: "24px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
    gap: "16px",
    marginTop: "12px",
  },
  statCard: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
  },
  statName: {
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    color: "#555",
  },
  statModifier: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1d4ed8",
    margin: "8px 0",
  },
  statScore: {
    fontSize: "12px",
    color: "#666",
  },
};
