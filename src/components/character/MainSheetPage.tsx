import { CSSProperties } from "react";
import { Character } from "../../types/character";

const SKILLS_BY_ABILITY: Record<keyof Character["stats"], string[]> = {
  strength: ["Athletics"],
  dexterity: ["Acrobatics", "Sleight of Hand", "Stealth"],
  constitution: [],
  intelligence: ["Arcana", "History", "Investigation", "Nature", "Religion"],
  wisdom: ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"],
  charisma: ["Deception", "Intimidation", "Performance", "Persuasion"],
};

interface MainSheetPageProps {
  character: Character;
}

export function MainSheetPage({ character }: MainSheetPageProps) {
  const getRawModifier = (score: number): number =>
    Math.floor(((score || 10) - 10) / 2);

  const formatModifier = (mod: number): string =>
    mod >= 0 ? `+${mod}` : `${mod}`;

  const totalLevel =
    (character.level || 1) +
    (character.multiclass?.reduce((acc, mc) => acc + (mc.level || 0), 0) || 0);

  const proficiencyBonus = Math.ceil(1 + totalLevel / 4);

  const stats = character.stats || {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  };

  const dexMod = getRawModifier(stats.dexterity);
  const wisMod = getRawModifier(stats.wisdom);

  const armor = character.armorClass?.equippedArmor;
  const baseAc = armor?.baseAc ?? 10 + dexMod;
  const shieldAc = character.armorClass?.hasShield
    ? character.armorClass.shieldAcBonus || 2
    : 0;
  const flatAcBonus = character.armorClass?.flatBonus || 0;
  const computedAC = baseAc + shieldAc + flatAcBonus;

  const initiative = character.initiativeBonus ?? dexMod;
  const isPerceptionProficient =
    character.skillProficiencies?.includes("Perception");
  const isPerceptionExpert = character.skillExpertise?.includes("Perception");
  const perceptionBonus =
    wisMod +
    (isPerceptionExpert
      ? proficiencyBonus * 2
      : isPerceptionProficient
        ? proficiencyBonus
        : 0);
  const passivePerception = character.passivePerception ?? 10 + perceptionBonus;

  const speed = character.speed || { walk: 30 };
  const deathSaves = character.deathSaves || { successes: 0, failures: 0 };
  const hitDice = character.hitDice || [
    {
      current: character.level || 1,
      total: character.level || 1,
      dieType: "d8",
    },
  ];

  const classEntries = [
    {
      className: character.class,
      subclass: character.subclass,
      level: character.level || 1,
      xp: character.xp ?? 0,
      isMain: true,
    },
    ...(character.multiclass || []).map((mc) => ({
      className: mc.class,
      subclass: mc.subclass,
      level: mc.level || 1,
      xp: mc.xp ?? 0,
      isMain: false,
    })),
  ];

  const renderCheckboxes = (count: number, max: number = 3) => {
    const boxes = [];
    for (let i = 1; i <= max; i++) {
      boxes.push(
        <span
          key={i}
          style={{
            display: "inline-block",
            width: "14px",
            height: "14px",
            border: "1px solid #333",
            borderRadius: "3px",
            backgroundColor: i <= count ? "#333" : "#fff",
            marginRight: "4px",
          }}
        />,
      );
    }
    return boxes;
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox}>
        <header style={styles.header}>
          <div>
            <h1 style={{ margin: 0, fontSize: "28px", color: "#111" }}>
              {character.name}
            </h1>
            <span style={styles.subtitle}>
              Total Level {totalLevel} | {character.race} (
              {character.size || "Medium"}) |{" "}
              {character.background || "No Background"}
            </span>
          </div>

          <div style={styles.profBonusPill}>
            <span style={styles.profBonusLabel}>Proficiency Bonus</span>
            <span style={styles.profBonusValue}>+{proficiencyBonus}</span>
          </div>
        </header>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Class & Level Breakdown</h2>
          <div style={styles.classGrid}>
            {classEntries.map((cls, idx) => (
              <div key={idx} style={styles.classCard}>
                <div style={styles.classHeader}>
                  <span style={styles.classNameText}>
                    {cls.className} {cls.subclass ? `(${cls.subclass})` : ""}
                  </span>
                  {cls.isMain && <span style={styles.mainTag}>Primary</span>}
                </div>
                <div style={styles.classStatsRow}>
                  <div>
                    <span style={styles.smallLabel}>Level</span>
                    <div style={styles.classValue}>{cls.level}</div>
                  </div>
                  <div>
                    <span style={styles.smallLabel}>Class XP</span>
                    <div style={styles.classValue}>
                      {cls.xp.toLocaleString()} XP
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.vitalsBar}>
          <div style={styles.vitalCard}>
            <span style={styles.vitalLabel}>Armor Class</span>
            <span style={styles.vitalValue}>{computedAC}</span>
            <span style={styles.subText}>
              {armor ? armor.name : "Unarmored"}
              {character.armorClass?.hasShield ? " + Shield" : ""}
            </span>
          </div>

          <div style={styles.vitalCard}>
            <span style={styles.vitalLabel}>Hit Points</span>
            <span style={styles.vitalValue}>
              {character.currentHp ?? 10}{" "}
              <span style={{ fontSize: "14px", color: "#666" }}>
                / {character.maxHp ?? 10}
              </span>
            </span>
            <span style={styles.subText}>Temp HP: {character.tempHp ?? 0}</span>
          </div>

          <div style={styles.vitalCard}>
            <span style={styles.vitalLabel}>Initiative</span>
            <span style={styles.vitalValue}>{formatModifier(initiative)}</span>
          </div>

          <div style={styles.vitalCard}>
            <span style={styles.vitalLabel}>Speed</span>
            <span style={styles.vitalValue}>{speed.walk ?? 30} ft</span>
            <span style={styles.subText}>
              {[
                speed.fly && `Fly: ${speed.fly}ft`,
                speed.swim && `Swim: ${speed.swim}ft`,
                speed.climb && `Climb: ${speed.climb}ft`,
              ]
                .filter(Boolean)
                .join(" | ") || "Walk Only"}
            </span>
          </div>

          <div style={styles.vitalCard}>
            <span style={styles.vitalLabel}>Passive Perception</span>
            <span style={styles.vitalValue}>{passivePerception}</span>
          </div>

          <div style={styles.vitalCard}>
            <span style={styles.vitalLabel}>Hit Dice</span>
            <div style={{ marginTop: "4px" }}>
              {hitDice.map((hd, idx) => (
                <div key={idx} style={styles.subText}>
                  {hd.dieType}: {hd.current}/{hd.total}
                </div>
              ))}
            </div>
          </div>

          <div style={styles.vitalCard}>
            <span style={styles.vitalLabel}>Death Saves</span>
            <div style={styles.deathSavesContainer}>
              <div style={styles.deathSaveRow}>
                <span style={styles.deathSaveLabel}>Success:</span>
                <div style={{ display: "flex" }}>
                  {renderCheckboxes(deathSaves.successes)}
                </div>
              </div>
              <div style={styles.deathSaveRow}>
                <span style={styles.deathSaveLabel}>Failure:</span>
                <div style={{ display: "flex" }}>
                  {renderCheckboxes(deathSaves.failures)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={styles.gridTwoColumn}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Ability Scores</h2>
              <div style={styles.statsGrid}>
                {(Object.keys(stats) as Array<keyof typeof stats>).map(
                  (stat) => {
                    const score = stats[stat];
                    const mod = getRawModifier(score);

                    return (
                      <div key={stat} style={styles.statCard}>
                        <span style={styles.statName}>{stat}</span>
                        <span style={styles.statModifier}>
                          {formatModifier(mod)}
                        </span>
                        <span style={styles.statScore}>Score {score}</span>
                      </div>
                    );
                  },
                )}
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Saving Throws</h2>
              <div style={styles.savesGrid}>
                {(Object.keys(stats) as Array<keyof typeof stats>).map(
                  (stat) => {
                    const score = stats[stat];
                    const mod = getRawModifier(score);
                    const isProficient =
                      character.savingThrowProficiencies?.includes(stat);
                    const saveTotal =
                      mod + (isProficient ? proficiencyBonus : 0);

                    return (
                      <div key={stat} style={styles.saveRow}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              color: isProficient ? "#111" : "#ccc",
                              fontSize: "12px",
                            }}
                          >
                            {isProficient ? "●" : "○"}
                          </span>
                          <span style={styles.saveName}>
                            {stat.charAt(0).toUpperCase() + stat.slice(1)}
                          </span>
                        </div>
                        <span style={{ fontWeight: "bold", color: "#111" }}>
                          {formatModifier(saveTotal)}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            </section>

            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Languages</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(character.languages || ["Common"]).map((lang) => (
                  <span key={lang} style={styles.chip}>
                    {lang}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Skills by Ability</h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {(
                Object.keys(SKILLS_BY_ABILITY) as Array<keyof typeof stats>
              ).map((stat) => {
                const skills = SKILLS_BY_ABILITY[stat];
                if (skills.length === 0) return null;

                const abilityMod = getRawModifier(stats[stat]);

                return (
                  <div key={stat} style={styles.skillGroupContainer}>
                    <div style={styles.skillGroupHeader}>
                      <span style={styles.skillGroupTitle}>
                        {stat.toUpperCase()}
                      </span>
                      <span style={styles.skillGroupMod}>
                        {formatModifier(abilityMod)}
                      </span>
                    </div>

                    <div style={styles.skillsList}>
                      {skills.map((skill) => {
                        const isProficient =
                          character.skillProficiencies?.includes(skill);
                        const isExpert =
                          character.skillExpertise?.includes(skill);

                        let bonus = abilityMod;
                        if (isExpert) bonus += proficiencyBonus * 2;
                        else if (isProficient) bonus += proficiencyBonus;

                        return (
                          <div key={skill} style={styles.skillRow}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <span style={styles.proficiencyIcon}>
                                {isExpert ? "⮟" : isProficient ? "●" : "○"}
                              </span>
                              <span style={styles.skillName}>{skill}</span>
                              {isExpert && (
                                <span style={styles.expertiseTag}>
                                  Expertise
                                </span>
                              )}
                            </div>
                            <span style={styles.skillValue}>
                              {formatModifier(bonus)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
  profBonusPill: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 16px",
  },
  profBonusLabel: {
    fontSize: "10px",
    textTransform: "uppercase",
    color: "#666",
    fontWeight: "bold",
  },
  profBonusValue: { fontSize: "20px", fontWeight: "bold", color: "#111" },
  section: {
    backgroundColor: "#fff",
    padding: "18px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    marginTop: "16px",
  },
  sectionTitle: {
    margin: "0 0 14px 0",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#111",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  classGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
  },
  classCard: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "12px",
  },
  classHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  classNameText: { fontWeight: "bold", fontSize: "14px", color: "#111" },
  mainTag: {
    fontSize: "10px",
    backgroundColor: "#e5e7eb",
    color: "#374151",
    padding: "2px 6px",
    borderRadius: "4px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  classStatsRow: { display: "flex", gap: "24px" },
  smallLabel: {
    fontSize: "10px",
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  classValue: { fontSize: "14px", fontWeight: "bold", color: "#111" },
  vitalsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "12px",
    marginTop: "16px",
  },
  vitalCard: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  vitalLabel: {
    fontSize: "10px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#6b7280",
  },
  vitalValue: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#111",
    marginTop: "4px",
  },
  subText: { fontSize: "11px", color: "#6b7280", marginTop: "2px" },
  deathSavesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "6px",
  },
  deathSaveRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
  },
  deathSaveLabel: { fontSize: "11px", color: "#374151", fontWeight: "600" },
  gridTwoColumn: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "20px",
    marginTop: "16px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 6px",
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
  },
  statName: {
    fontSize: "10px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#6b7280",
  },
  statModifier: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#111",
    margin: "2px 0",
  },
  statScore: { fontSize: "10px", color: "#9ca3af" },
  savesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
  },
  saveRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 10px",
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    border: "1px solid #f3f4f6",
    fontSize: "13px",
  },
  saveName: { color: "#374151" },
  skillGroupContainer: {
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    padding: "10px 12px",
  },
  skillGroupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "6px",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "8px",
  },
  skillGroupTitle: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#374151",
    letterSpacing: "0.05em",
  },
  skillGroupMod: { fontSize: "12px", fontWeight: "bold", color: "#6b7280" },
  skillsList: { display: "flex", flexDirection: "column", gap: "4px" },
  skillRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 6px",
    fontSize: "13px",
  },
  proficiencyIcon: {
    fontSize: "12px",
    color: "#374151",
    width: "14px",
    display: "inline-block",
  },
  skillName: { color: "#111" },
  expertiseTag: {
    fontSize: "9px",
    backgroundColor: "#e0e7ff",
    color: "#3730a3",
    padding: "1px 5px",
    borderRadius: "4px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  skillValue: { fontWeight: "bold", color: "#111" },
  chip: {
    backgroundColor: "#f3f4f6",
    border: "1px solid #e5e7eb",
    color: "#374151",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "16px",
  },
};
