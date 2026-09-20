import { CharacterSummary } from "../types/character";

interface CharacterCardProps {
  character: CharacterSummary;
  onClick: (id: string) => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <div onClick={() => onClick(character.id)} style={styles.card}>
      <h3 style={{ margin: "0 0 8px 0" }}>{character.name}</h3>
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
  },
  cardDetail: {
    margin: 0,
    color: "#666666",
    fontSize: "14px",
  },
};
