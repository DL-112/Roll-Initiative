import { CharacterSummary } from "../types/character";

interface CharacterCardProps {
  character: CharacterSummary;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CharacterCard({
  character,
  onClick,
  onDelete,
}: CharacterCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents navigating to character sheet when clicking delete
    onDelete(character.id);
  };

  return (
    <div onClick={() => onClick(character.id)} style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={{ margin: 0 }}>{character.name}</h3>
        <button
          onClick={handleDelete}
          style={styles.deleteButton}
          title="Delete Character"
        >
          ✕
        </button>
      </div>
      <p style={styles.cardDetail}>
        Level {character.level} • {character.race} {character.class}
      </p>
    </div>
  );
}

const styles = {
  card: {
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    cursor: "pointer",
    border: "1px solid #e5e5e5",
    position: "relative" as const,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  cardDetail: {
    margin: 0,
    color: "#666666",
    fontSize: "14px",
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#ef4444",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px",
  },
};
