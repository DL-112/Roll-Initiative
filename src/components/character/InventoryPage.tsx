import { CSSProperties } from "react";
import { Character } from "../../types/character";

interface InventoryPageProps {
  character: Character;
}

export function InventoryPage({ character }: InventoryPageProps) {
  const currency = character.currency || { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox}>
        <header style={styles.header}>
          <h1 style={{ margin: 0, fontSize: "26px", color: "#111" }}>
            Weapons, Equipment & Inventory
          </h1>
          <span style={styles.subtitle}>{character.name}</span>
        </header>

        <div style={styles.gridTwoColumn}>
          {/* Weapons & Combat Equipment */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Weapons & Martial Gear</h2>
            <div style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={styles.cardTitle}>Attacks & Weapons</span>
              </div>
              <p style={styles.cardText}>
                No explicit weapons equipped. Standard unarmed strike (+
                {Math.max(
                  0,
                  Math.floor(((character.stats?.strength || 10) - 10) / 2),
                )}{" "}
                to hit).
              </p>
            </div>
          </section>

          {/* Carrying Capacity & Inventory Items */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Currency & Valuables</h2>
            <div style={styles.currencyGrid}>
              <div style={styles.coinCard}>
                <span style={styles.coinLabel}>CP</span>
                <span style={styles.coinValue}>{currency.cp}</span>
              </div>
              <div style={styles.coinCard}>
                <span style={styles.coinLabel}>SP</span>
                <span style={styles.coinValue}>{currency.sp}</span>
              </div>
              <div style={styles.coinCard}>
                <span style={styles.coinLabel}>EP</span>
                <span style={styles.coinValue}>{currency.ep}</span>
              </div>
              <div style={styles.coinCard}>
                <span style={{ ...styles.coinLabel, color: "#b45309" }}>
                  GP
                </span>
                <span style={{ ...styles.coinValue, color: "#b45309" }}>
                  {currency.gp}
                </span>
              </div>
              <div style={styles.coinCard}>
                <span style={styles.coinLabel}>PP</span>
                <span style={styles.coinValue}>{currency.pp}</span>
              </div>
            </div>
          </section>
        </div>
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
  gridTwoColumn: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "20px",
    marginTop: "16px",
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
  card: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "12px",
  },
  cardTitle: { fontWeight: "bold", fontSize: "14px", color: "#111" },
  cardText: { fontSize: "13px", color: "#4b5563", marginTop: "4px" },
  currencyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "8px",
  },
  coinCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "8px 2px",
  },
  coinLabel: { fontSize: "10px", fontWeight: "bold", color: "#6b7280" },
  coinValue: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#111",
    marginTop: "2px",
  },
};
