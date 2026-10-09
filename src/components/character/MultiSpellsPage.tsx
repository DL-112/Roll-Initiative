import { CSSProperties } from "react";
import { Character } from "../../types/character";

interface MultiSpellsPageProps {
  character: Character;
}

export function MultiSpellsPage({ character }: MultiSpellsPageProps) {
  const getRawModifier = (score: number): number =>
    Math.floor(((score || 10) - 10) / 2);

  const formatModifier = (mod: number): string =>
    mod >= 0 ? `+${mod}` : `${mod}`;

  const totalLevel =
    (character.level || 1) +
    (character.multiclass?.reduce((acc, mc) => acc + (mc.level || 0), 0) || 0);

  const proficiencyBonus = Math.ceil(1 + totalLevel / 4);
  const stats = character.stats || { charisma: 10 };
  const multiclassName = character.multiclass?.[0]?.class || "Multiclass";

  const multiSpells = (character.spells || []).filter(
    (s) => s.class && s.class.toLowerCase() === multiclassName.toLowerCase(),
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox}>
        <header style={styles.header}>
          <div>
            <h1 style={{ margin: 0, fontSize: "26px", color: "#111" }}>
              {multiclassName} Spells
            </h1>
            <span style={styles.subtitle}>
              Multiclass Magic • {character.name}
            </span>
          </div>
        </header>

        <div style={styles.spellStatsRow}>
          <div style={styles.spellStatCard}>
            <span style={styles.smallLabel}>Spellcasting Ability</span>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Charisma
            </span>
          </div>
          <div style={styles.spellStatCard}>
            <span style={styles.smallLabel}>Spell Save DC</span>
            <span
              style={{ fontSize: "18px", fontWeight: "bold", color: "#b45309" }}
            >
              {8 + proficiencyBonus + getRawModifier(stats.charisma || 10)}
            </span>
          </div>
          <div style={styles.spellStatCard}>
            <span style={styles.smallLabel}>Spell Attack Bonus</span>
            <span
              style={{ fontSize: "18px", fontWeight: "bold", color: "#1d4ed8" }}
            >
              {formatModifier(
                proficiencyBonus + getRawModifier(stats.charisma || 10),
              )}
            </span>
          </div>
        </div>

        <section style={{ ...styles.section, marginTop: "20px" }}>
          <h2 style={styles.sectionTitle}>{multiclassName} Known Spells</h2>
          {multiSpells.length === 0 ? (
            <p style={{ color: "#666", fontSize: "14px" }}>
              No {multiclassName} spells recorded.
            </p>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {multiSpells.map((spell, idx) => (
                <div key={idx} style={styles.card}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={styles.cardTitle}>{spell.name}</span>
                    <span style={styles.mainTag}>Level {spell.level}</span>
                  </div>
                  <p style={styles.cardText}>{spell.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  pageContainer: {
    width: "100vw",
    padding: "24px 60px 40px 60px",
    boxSizing: "border-box",
  },
  contentBox: { maxWidth: "1100px", margin: "0 auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    borderBottom: "2px solid #eee",
  },
  subtitle: { fontSize: "14px", color: "#666" },
  smallLabel: {
    fontSize: "10px",
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#fff",
    padding: "18px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  sectionTitle: {
    margin: "0 0 14px 0",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#111",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  spellStatsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginTop: "16px",
  },
  spellStatCard: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "12px",
  },
  cardTitle: { fontWeight: "bold", fontSize: "14px", color: "#111" },
  cardText: {
    fontSize: "13px",
    color: "#4b5563",
    marginTop: "4px",
    lineHeight: "1.4",
  },
  mainTag: {
    fontSize: "10px",
    backgroundColor: "#e5e7eb",
    color: "#374151",
    padding: "2px 6px",
    borderRadius: "4px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
};
