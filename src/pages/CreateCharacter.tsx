import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../types/character";
import { saveCharacter } from "../services/storage";

export function CreateCharacter() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    race: "Human",
    class: "Fighter",
    level: 1,
    background: "Folk Hero",
    alignment: "True Neutral",
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  const handleStatChange = (
    stat: keyof typeof formData.stats,
    value: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter a character name.");
      return;
    }

    try {
      setIsSubmitting(true);
      const newCharacter: Character = {
        id: Date.now().toString(),
        ...formData,
      };

      await saveCharacter(newCharacter);
      navigate(`/character/${newCharacter.id}`);
    } catch (err) {
      console.error("Failed to save character:", err);
      alert("Error creating character.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button style={styles.secondaryButton} onClick={() => navigate("/")}>
          ← Cancel
        </button>
        <h1 style={{ margin: 0 }}>Create New Character</h1>
      </header>

      <form onSubmit={handleSubmit} style={styles.form}>
        <section style={styles.section}>
          <h2>Basic Details</h2>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Character Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Valeros"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Class</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                style={styles.input}
              >
                {[
                  "Barbarian",
                  "Bard",
                  "Cleric",
                  "Druid",
                  "Fighter",
                  "Monk",
                  "Paladin",
                  "Ranger",
                  "Rogue",
                  "Sorcerer",
                  "Warlock",
                  "Wizard",
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Race</label>
              <select
                name="race"
                value={formData.race}
                onChange={handleChange}
                style={styles.input}
              >
                {[
                  "Dragonborn",
                  "Dwarf",
                  "Elf",
                  "Gnome",
                  "Half-Elf",
                  "Half-Orc",
                  "Halfling",
                  "Human",
                  "Tiefling",
                ].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Starting Level</label>
              <input
                type="number"
                name="level"
                min={1}
                max={20}
                value={formData.level}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2>Ability Scores</h2>
          <div style={styles.statsGrid}>
            {(
              Object.keys(formData.stats) as Array<keyof typeof formData.stats>
            ).map((stat) => (
              <div key={stat} style={styles.statBox}>
                <label style={{ ...styles.label, textTransform: "capitalize" }}>
                  {stat}
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={formData.stats[stat]}
                  onChange={(e) =>
                    handleStatChange(stat, Number(e.target.value))
                  }
                  style={styles.statInput}
                />
              </div>
            ))}
          </div>
        </section>

        <div style={styles.actions}>
          <button
            type="submit"
            style={styles.primaryButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Confirm & Create Character"}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    fontFamily: "sans-serif",
    maxWidth: "800px",
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
  form: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  section: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e5e5e5",
  },
  row: {
    display: "flex",
    gap: "16px",
    marginTop: "12px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column" as const,
    flex: 1,
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "#444",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "12px",
    marginTop: "12px",
  },
  statBox: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#f9f9f9",
    borderRadius: "6px",
    border: "1px solid #e0e0e0",
  },
  statInput: {
    width: "50px",
    textAlign: "center" as const,
    padding: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  primaryButton: {
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
};
