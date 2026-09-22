import { CSSProperties } from "react";

export interface ClassDetails {
  name: string;
  tagline: string;
  description: string;
  likes: string;
  primaryAbility: string;
  complexity: "Low" | "Average" | "High";
}

export const CLASSES: ClassDetails[] = [
  {
    name: "Artificer",
    tagline: "Masters of invention, magic, and tinkerwork",
    description:
      "Masters of unlocking magic within everyday objects, artificers are supreme inventors who view magic as a complex system waiting to be decoded and controlled.",
    likes: "Invention & Crafting",
    primaryAbility: "Intelligence",
    complexity: "High",
  },
  {
    name: "Barbarian",
    tagline:
      "A fierce warrior of primitive background who can enter a battle rage",
    description:
      "For spirits driven by primal fury, battle is a trance where instincts override pain and reasoned thought gives way to unyielding strength.",
    likes: "Battle",
    primaryAbility: "Strength",
    complexity: "Average",
  },
  {
    name: "Bard",
    tagline: "An inspiring magician whose power echoes the music of creation",
    description:
      "Bards weave magic through words, song, and performance to inspire allies, demoralize foes, and manipulate the fabric of reality.",
    likes: "Performing",
    primaryAbility: "Charisma",
    complexity: "High",
  },
  {
    name: "Cleric",
    tagline:
      "A priestly champion who wields divine magic in service of a higher power",
    description:
      "Intermediaries between the mortal world and the distant planes of gods, clerics channel divine power to heal, bolster, and smite.",
    likes: "Gods",
    primaryAbility: "Wisdom",
    complexity: "Average",
  },
  {
    name: "Druid",
    tagline: "A priest of the Old Faith, wielding the powers of nature",
    description:
      "Guardians of nature who draw power from elemental forces and wild beasts, druids embody the resilience and fury of the natural world.",
    likes: "Nature",
    primaryAbility: "Wisdom",
    complexity: "High",
  },
  {
    name: "Fighter",
    tagline:
      "A master of martial combat, skilled with a variety of weapons and armor",
    description:
      "Fighters combine rigorous training with practical battlefield tactics, standing as versatile frontline combatants and weapon specialists.",
    likes: "Weapons",
    primaryAbility: "Strength or Dexterity",
    complexity: "Low",
  },
  {
    name: "Monk",
    tagline:
      "A master of martial arts, harnessing the power of the body in pursuit of perfection",
    description:
      "Monks harness body energy to perform superhuman feats, blending swift physical strikes with focused spiritual discipline.",
    likes: "Unarmed combat",
    primaryAbility: "Dexterity and Wisdom",
    complexity: "High",
  },
  {
    name: "Paladin",
    tagline: "A holy warrior bound to a sacred oath",
    description:
      "Bound by a solemn oath to uphold justice and righteousness, paladins combine divine magic with heavy martial prowess.",
    likes: "Defense",
    primaryAbility: "Strength and Charisma",
    complexity: "Average",
  },
  {
    name: "Ranger",
    tagline: "A warrior who combat threats on the edges of civilization",
    description:
      "Scouts and trackers of the wilderness, rangers use martial expertise and nature magic to track down elusive prey.",
    likes: "Survival",
    primaryAbility: "Dexterity and Wisdom",
    complexity: "Average",
  },
  {
    name: "Rogue",
    tagline: "A scoundrel who uses stealth and trickery to overcome obstacles",
    description:
      "Specialists in stealth, precision strikes, and lethal accuracy, rogues exploit enemy weaknesses and excel at tricky situations.",
    likes: "Stealth",
    primaryAbility: "Dexterity",
    complexity: "Low",
  },
  {
    name: "Sorcerer",
    tagline:
      "A spellcaster who draws on inherent magic from a gift or bloodline",
    description:
      "Sorcerers do not study or pray for magic; raw arcana flows directly through their bloodline or a cosmic twist of fate.",
    likes: "Power",
    primaryAbility: "Charisma",
    complexity: "High",
  },
  {
    name: "Warlock",
    tagline:
      "A wielder of magic derived from a bargain with an extraplanar entity",
    description:
      "Warlocks gain magical knowledge through dark or mysterious pacts signed with powerful otherworldly patrons.",
    likes: "Occult lore",
    primaryAbility: "Charisma",
    complexity: "High",
  },
  {
    name: "Wizard",
    tagline:
      "A scholarly magic-user capable of manipulating the structures of reality",
    description:
      "Supreme students of the arcane, wizards spend lifetimes researching ancient scrolls and spellbooks to command formidable magical spells.",
    likes: "Spellbooks",
    primaryAbility: "Intelligence",
    complexity: "Average",
  },
];

interface StepClassProps {
  selectedClass: string;
  onSelectClass: (cls: string) => void;
}

export function StepClass({ selectedClass, onSelectClass }: StepClassProps) {
  const activeClass =
    CLASSES.find((c) => c.name === selectedClass) || CLASSES[0];

  return (
    <div style={styles.stepContent}>
      <div>
        <h2 style={styles.title}>Step 1: Choose Class</h2>
        <p style={styles.subtitle}>
          Select a class to view its details and stats.
        </p>
      </div>

      <div style={styles.layoutGroup}>
        {/* Left Side: Flexible Class Grid */}
        <div style={styles.gridSelector}>
          {CLASSES.map((cls) => {
            const isSelected = selectedClass === cls.name;

            return (
              <button
                type="button"
                key={cls.name}
                onClick={() => onSelectClass(cls.name)}
                style={isSelected ? styles.optionSelected : styles.optionCard}
              >
                <span>{cls.name}</span>
                {isSelected && <span style={styles.badge}>Selected</span>}
              </button>
            );
          })}
        </div>

        {/* Right Side: Flexible Detail Panel */}
        <div style={styles.previewPanel}>
          <div style={styles.previewHeader}>
            <h3 style={styles.previewTitle}>{activeClass.name}</h3>
            <p style={styles.previewTagline}>{activeClass.tagline}</p>
          </div>

          <p style={styles.description}>{activeClass.description}</p>

          <div style={styles.metaGrid}>
            <div style={styles.metaBox}>
              <span style={styles.metaLabel}>Class Likes</span>
              <span style={styles.metaValue}>{activeClass.likes}</span>
            </div>
            <div style={styles.metaBox}>
              <span style={styles.metaLabel}>Primary Ability</span>
              <span style={styles.metaValue}>{activeClass.primaryAbility}</span>
            </div>
            <div style={styles.metaBox}>
              <span style={styles.metaLabel}>Complexity</span>
              <span style={styles.metaValue}>{activeClass.complexity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  stepContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#111827",
  },
  subtitle: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#6b7280",
  },
  layoutGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    width: "100%",
  },
  gridSelector: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "8px",
    alignContent: "start",
  },
  optionCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151",
    textAlign: "left",
    transition: "all 0.15s ease",
  },
  optionSelected: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "2px solid #2563eb",
    backgroundColor: "#eff6ff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#1e40af",
    textAlign: "left",
    transition: "all 0.15s ease",
  },
  badge: {
    fontSize: "10px",
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "2px 5px",
    borderRadius: "10px",
    fontWeight: 600,
  },
  previewPanel: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "fit-content",
  },
  previewHeader: {
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "12px",
  },
  previewTitle: {
    margin: 0,
    fontSize: "22px",
    color: "#1f2937",
  },
  previewTagline: {
    margin: "4px 0 0 0",
    fontSize: "13px",
    color: "#6b7280",
    fontStyle: "italic",
  },
  description: {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#374151",
    margin: 0,
  },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "10px",
  },
  metaBox: {
    padding: "10px 12px",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  metaLabel: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  metaValue: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#111827",
  },
};
