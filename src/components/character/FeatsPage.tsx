import { useState, CSSProperties } from "react";
import { Character, EquipmentItem } from "../../types/character";

interface FeatOrFeature {
  name: string;
  description: string;
  source?: string;
  type?: string;
  chosenOptions?: string[];
}

interface PetOrCompanion {
  name: string;
  type: string;
  hp?: number;
  maxHp?: number;
  ac?: number;
  notes?: string;
}

interface FeatsPageProps {
  character: Character & {
    attunedItems?: EquipmentItem[];
    equippedGear?: {
      rightHand?: string;
      leftHand?: string;
      wearables?: string[];
    };
    companions?: PetOrCompanion[];
  };
}

export function FeatsPage({ character }: FeatsPageProps) {
  const [selectedItem, setSelectedItem] = useState<FeatOrFeature | null>(null);
  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  const featsList: FeatOrFeature[] = character.feats || [];
  const featuresList: FeatOrFeature[] = character.features || [];

  // Attuned items fallback
  const attunedItems =
    character.attunedItems ||
    (character.inventory || []).filter((item) => item.isAttuned);

  // Equipped gear fallbacks
  const equippedGear = character.equippedGear || {
    rightHand: character.weapons?.[0]?.name || "Unarmed / Main Weapon",
    leftHand: character.armorClass?.hasShield
      ? "Shield"
      : "Arcane Focus / Free",
    wearables: [
      ...(character.armorClass?.equippedArmor
        ? [character.armorClass.equippedArmor.name]
        : []),
      ...(character.inventory || [])
        .filter((i) => i.isEquipped && !i.isWeapon)
        .map((i) => i.name),
    ],
  };

  // Companions fallback
  const companions: PetOrCompanion[] = character.companions || [
    {
      name: "Barnaby",
      type: "Llama / Companion",
      hp: 15,
      maxHp: 15,
      ac: 10,
      notes: "Pack llama & loyal companion",
    },
  ];

  const toggleOptionDropdown = (name: string) => {
    setExpandedOption(expandedOption === name ? null : name);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Features, Traits & Active Gear</h1>
            <span style={styles.subtitle}>{character.name}</span>
          </div>
        </header>

        {/* Top Active Equipment & Attunement Bar */}
        <div style={styles.activeGearGrid}>
          {/* Held Items */}
          <div style={styles.gearCard}>
            <span style={styles.gearCardTitle}>HELD IN HANDS</span>
            <div style={styles.handRow}>
              <div style={styles.handItem}>
                <span style={styles.handLabel}>RIGHT HAND</span>
                <span style={styles.handVal}>
                  {equippedGear.rightHand || "Empty"}
                </span>
              </div>
              <div style={styles.handItem}>
                <span style={styles.handLabel}>LEFT HAND</span>
                <span style={styles.handVal}>
                  {equippedGear.leftHand || "Empty"}
                </span>
              </div>
            </div>
          </div>

          {/* Attuned Magic Items */}
          <div style={styles.gearCard}>
            <div style={styles.cardHeaderFlex}>
              <span style={styles.gearCardTitle}>ATTUNED MAGIC ITEMS</span>
              <span style={styles.attuneBadge}>
                {attunedItems.length} / 3 Attuned
              </span>
            </div>
            <div style={styles.chipRow}>
              {attunedItems.length === 0 ? (
                <span style={styles.emptyText}>No attuned magic items.</span>
              ) : (
                attunedItems.map((item, i) => (
                  <span key={i} style={styles.attunedChip}>
                    ✦ {item.name}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Equipped Wearables */}
          <div style={styles.gearCard}>
            <span style={styles.gearCardTitle}>WEARING & EQUIPPED</span>
            <div style={styles.chipRow}>
              {(equippedGear.wearables || []).length === 0 ? (
                <span style={styles.emptyText}>No wearable gear active.</span>
              ) : (
                equippedGear.wearables?.map((item, i) => (
                  <span key={i} style={styles.wearableChip}>
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main Features, Feats & Companion Layout */}
        <div style={styles.mainGrid}>
          {/* LEFT: Feats & Class Features List */}
          <div style={styles.leftColumn}>
            {/* Feats & Special Abilities Section */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Feats & Special Abilities</h2>
              {featsList.length === 0 ? (
                <p style={styles.emptyText}>No feats recorded.</p>
              ) : (
                <div style={styles.cardList}>
                  {featsList.map((feat, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...styles.interactiveCard,
                        ...(selectedItem?.name === feat.name
                          ? styles.interactiveCardActive
                          : {}),
                      }}
                      onClick={() => setSelectedItem(feat)}
                    >
                      <div style={styles.cardTitleRow}>
                        <span style={styles.cardTitle}>{feat.name}</span>
                        {feat.source && (
                          <span style={styles.smallTag}>{feat.source}</span>
                        )}
                      </div>
                      <p style={styles.cardPreviewText}>{feat.description}</p>

                      {/* Dropdown for chosen mini-lists (e.g. Metamagic, Invocations) */}
                      {feat.chosenOptions && feat.chosenOptions.length > 0 && (
                        <div style={styles.dropdownContainer}>
                          <button
                            type="button"
                            style={styles.dropdownToggle}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleOptionDropdown(feat.name);
                            }}
                          >
                            <span>
                              Chosen Selections ({feat.chosenOptions.length})
                            </span>
                            <span>
                              {expandedOption === feat.name ? "▲" : "▼"}
                            </span>
                          </button>

                          {expandedOption === feat.name && (
                            <div style={styles.dropdownList}>
                              {feat.chosenOptions.map((opt, oIdx) => (
                                <div key={oIdx} style={styles.dropdownItem}>
                                  • {opt}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Class Features & Traits Section */}
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Class Features & Traits</h2>
              {featuresList.length === 0 ? (
                <p style={styles.emptyText}>No class features listed.</p>
              ) : (
                <div style={styles.cardList}>
                  {featuresList.map((feat, idx) => (
                    <div
                      key={idx}
                      style={{
                        ...styles.interactiveCard,
                        ...(selectedItem?.name === feat.name
                          ? styles.interactiveCardActive
                          : {}),
                      }}
                      onClick={() => setSelectedItem(feat)}
                    >
                      <div style={styles.cardTitleRow}>
                        <span style={styles.cardTitle}>{feat.name}</span>
                        {feat.source && (
                          <span style={styles.smallTag}>{feat.source}</span>
                        )}
                      </div>
                      <p style={styles.cardPreviewText}>{feat.description}</p>

                      {/* Dropdown for options */}
                      {feat.chosenOptions && feat.chosenOptions.length > 0 && (
                        <div style={styles.dropdownContainer}>
                          <button
                            type="button"
                            style={styles.dropdownToggle}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleOptionDropdown(feat.name);
                            }}
                          >
                            <span>
                              Prepared Choices ({feat.chosenOptions.length})
                            </span>
                            <span>
                              {expandedOption === feat.name ? "▲" : "▼"}
                            </span>
                          </button>

                          {expandedOption === feat.name && (
                            <div style={styles.dropdownList}>
                              {feat.chosenOptions.map((opt, oIdx) => (
                                <div key={oIdx} style={styles.dropdownItem}>
                                  • {opt}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* RIGHT: Detail Inspector Drawer & Pets/Familiars */}
          <div style={styles.rightColumn}>
            {/* Detail Inspector Card */}
            <div style={styles.inspectorCard}>
              <h2 style={styles.sectionTitle}>Feature Inspector</h2>
              {selectedItem ? (
                <div>
                  <div style={styles.inspectorHeader}>
                    <h3 style={styles.inspectorTitle}>{selectedItem.name}</h3>
                    {selectedItem.source && (
                      <span style={styles.smallTag}>{selectedItem.source}</span>
                    )}
                  </div>
                  <div style={styles.inspectorBody}>
                    <p style={styles.inspectorText}>
                      {selectedItem.description}
                    </p>
                  </div>

                  {selectedItem.chosenOptions && (
                    <div style={styles.inspectorSelections}>
                      <span style={styles.selectionLabel}>
                        Active Selections:
                      </span>
                      <div style={styles.chipRow}>
                        {selectedItem.chosenOptions.map((opt, i) => (
                          <span key={i} style={styles.selectionChip}>
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={styles.inspectorPlaceholder}>
                  <span style={{ fontSize: "20px" }}>📇</span>
                  <p
                    style={{
                      margin: "6px 0 0 0",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    Select or hover over any feature or feat to inspect its full
                    description.
                  </p>
                </div>
              )}
            </div>

            {/* Pets & Familiars Card */}
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Pets, Familiars & Companions</h2>
              {companions.length === 0 ? (
                <p style={styles.emptyText}>
                  No active companions or familiars.
                </p>
              ) : (
                companions.map((pet, idx) => (
                  <div key={idx} style={styles.petCard}>
                    <div style={styles.petHeader}>
                      <div>
                        <div style={styles.petName}>{pet.name}</div>
                        <div style={styles.petType}>{pet.type}</div>
                      </div>
                      <div style={styles.petStats}>
                        {pet.ac !== undefined && (
                          <span style={styles.petBadge}>AC {pet.ac}</span>
                        )}
                        {pet.hp !== undefined && (
                          <span style={styles.petBadge}>
                            {pet.hp}/{pet.maxHp} HP
                          </span>
                        )}
                      </div>
                    </div>
                    {pet.notes && <p style={styles.petNotes}>{pet.notes}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
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
  contentBox: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    marginBottom: "16px",
    borderBottom: "2px solid #eee",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "#111",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
  },
  activeGearGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "12px",
    marginBottom: "16px",
  },
  gearCard: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardHeaderFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gearCardTitle: {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  handRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },
  handItem: {
    backgroundColor: "#f9fafb",
    border: "1px solid #f3f4f6",
    borderRadius: "6px",
    padding: "8px 10px",
    display: "flex",
    flexDirection: "column",
  },
  handLabel: {
    fontSize: "10px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#6b7280",
  },
  handVal: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#111",
    marginTop: "2px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  attuneBadge: {
    fontSize: "9px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#3730a3",
    backgroundColor: "#e0e7ff",
    padding: "1px 5px",
    borderRadius: "4px",
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  attunedChip: {
    backgroundColor: "#e0e7ff",
    border: "1px solid #c7d2fe",
    color: "#3730a3",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "4px 10px",
    borderRadius: "16px",
  },
  wearableChip: {
    backgroundColor: "#f3f4f6",
    border: "1px solid #e5e7eb",
    color: "#374151",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "16px",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "20px",
    marginTop: "16px",
    alignItems: "start",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "sticky",
    top: "16px",
  },
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
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  interactiveCard: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "12px",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  interactiveCardActive: {
    backgroundColor: "#fff",
    borderColor: "#111",
  },
  cardTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "#111",
  },
  cardPreviewText: {
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "4px",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  smallTag: {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#374151",
    textTransform: "uppercase",
    backgroundColor: "#e5e7eb",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  dropdownContainer: {
    marginTop: "8px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "6px",
  },
  dropdownToggle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    padding: "4px 0",
    fontSize: "10px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#6b7280",
    cursor: "pointer",
  },
  dropdownList: {
    marginTop: "4px",
    paddingLeft: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  dropdownItem: {
    fontSize: "13px",
    color: "#374151",
  },
  inspectorCard: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "18px",
    minHeight: "180px",
  },
  inspectorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "8px",
    marginBottom: "12px",
  },
  inspectorTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "bold",
    color: "#111",
  },
  inspectorBody: {
    marginTop: "6px",
  },
  inspectorText: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#374151",
    whiteSpace: "pre-wrap",
  },
  inspectorSelections: {
    marginTop: "12px",
    paddingTop: "8px",
    borderTop: "1px solid #f3f4f6",
  },
  selectionLabel: {
    fontSize: "10px",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: "4px",
    display: "block",
  },
  selectionChip: {
    backgroundColor: "#e0e7ff",
    border: "1px solid #c7d2fe",
    color: "#3730a3",
    fontSize: "10px",
    fontWeight: "bold",
    padding: "2px 6px",
    borderRadius: "4px",
    textTransform: "uppercase",
  },
  inspectorPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "120px",
    textAlign: "center",
    color: "#9ca3af",
  },
  petCard: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "12px",
    marginBottom: "8px",
  },
  petHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  petName: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#111",
  },
  petType: {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
  },
  petStats: {
    display: "flex",
    gap: "6px",
  },
  petBadge: {
    fontSize: "10px",
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "#e5e7eb",
    color: "#374151",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  petNotes: {
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "6px",
    marginBottom: 0,
  },
  emptyText: {
    fontSize: "11px",
    color: "#9ca3af",
    fontStyle: "italic",
    margin: 0,
  },
};
