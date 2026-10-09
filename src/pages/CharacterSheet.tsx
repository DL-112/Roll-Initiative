import { useState, useEffect, CSSProperties } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Character } from "../types/character";
import { loadCharacterById } from "../services/storage";
import { FeatsPage } from "../components/character/FeatsPage";
import { InventoryPage } from "../components/character/InventoryPage";
import { MainSheetPage } from "../components/character/MainSheetPage";
import { MainSpellsPage } from "../components/character/MainSpellsPage";
import { MultiSpellsPage } from "../components/character/MultiSpellsPage";

export function CharacterSheet() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 0: Feats, 1: Inventory, 2: Main Sheet, 3: Main Spells, 4: Multi Spells
  const [currentPage, setCurrentPage] = useState<number>(2);

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

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={{ color: "#666" }}>Loading character sheet...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div style={{ padding: "24px", maxWidth: "1100px", margin: "0 auto" }}>
        <button style={styles.secondaryButton} onClick={() => navigate("/")}>
          ← Back to Dashboard
        </button>
        <p style={{ marginTop: "20px", color: "#d9534f" }}>
          Character not found!
        </p>
      </div>
    );
  }

  const mainClassName = character.class || "Sorcerer";
  const multiclassName = character.multiclass?.[0]?.class || "Warlock";

  return (
    <div style={styles.wrapper}>
      {/* CSS Styles for Comic Speech Bubble Pointers */}
      <style>{`
        .bubble-tab {
          position: relative;
        }
        
        /* Left pointing bubble tail */
        .bubble-left::before, .bubble-left::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border-style: solid;
        }
        .bubble-left::before {
          left: -12px;
          border-width: 9px 12px 9px 0;
          border-color: transparent #d1d5db transparent transparent;
        }
        .bubble-left::after {
          left: -10px;
          border-width: 8px 11px 8px 0;
          border-color: transparent #ffffff transparent transparent;
        }

        /* Right pointing bubble tail */
        .bubble-right::before, .bubble-right::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border-style: solid;
        }
        .bubble-right::before {
          right: -12px;
          border-width: 9px 0 9px 12px;
          border-color: transparent transparent transparent #d1d5db;
        }
        .bubble-right::after {
          right: -10px;
          border-width: 8px 0 8px 11px;
          border-color: transparent transparent transparent #ffffff;
        }

        /* Hover states */
        .bubble-tab:hover {
          background-color: #f9fafb !important;
          border-color: #9ca3af !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
        }
        .bubble-left:hover::before {
          border-color: transparent #9ca3af transparent transparent !important;
        }
        .bubble-right:hover::before {
          border-color: transparent transparent transparent #9ca3af !important;
        }
      `}</style>

      {/* Dynamic Nav Controls */}
      {currentPage === 2 ? (
        <>
          {/* Main Sheet: Left Navigation Group (Points Left) */}
          <div style={{ ...styles.navGroup, left: "20px" }}>
            <button
              className="bubble-tab bubble-left"
              style={styles.bubbleTabButton}
              onClick={() => setCurrentPage(0)}
            >
              <span style={styles.verticalText}>FEATS</span>
            </button>
            <button
              className="bubble-tab bubble-left"
              style={styles.bubbleTabButton}
              onClick={() => setCurrentPage(1)}
            >
              <span style={styles.verticalText}>EQUIPMENT</span>
            </button>
          </div>

          {/* Main Sheet: Right Navigation Group (Points Right) */}
          <div style={{ ...styles.navGroup, right: "20px" }}>
            <button
              className="bubble-tab bubble-right"
              style={styles.bubbleTabButton}
              onClick={() => setCurrentPage(3)}
            >
              <span style={styles.verticalText}>
                {mainClassName.toUpperCase()} SPELLS
              </span>
            </button>
            <button
              className="bubble-tab bubble-right"
              style={styles.bubbleTabButton}
              onClick={() => setCurrentPage(4)}
            >
              <span style={styles.verticalText}>
                {multiclassName.toUpperCase()} SPELLS
              </span>
            </button>
          </div>
        </>
      ) : (
        /* Sub-Pages Return Buttons */
        <div
          style={{
            ...styles.navGroup,
            ...(currentPage < 2 ? { right: "20px" } : { left: "20px" }),
          }}
        >
          <button
            className={`bubble-tab ${currentPage < 2 ? "bubble-right" : "bubble-left"}`}
            style={styles.bubbleTabButton}
            onClick={() => setCurrentPage(2)}
          >
            <span style={styles.verticalText}>MAIN SHEET</span>
          </button>
        </div>
      )}

      {/* Top Header Controls */}
      <div style={styles.topNavContainer}>
        <button style={styles.secondaryButton} onClick={() => navigate("/")}>
          ← Dashboard
        </button>
        {character.heroicInspiration && (
          <span style={styles.inspirationBadge}>★ Heroic Inspiration</span>
        )}
      </div>

      {/* 5-Page Horizontal Sliding Viewport */}
      <div style={styles.sliderViewport}>
        <div
          style={{
            ...styles.sliderTrack,
            transform: `translateX(-${currentPage * 100}vw)`,
          }}
        >
          <FeatsPage character={character} />
          <InventoryPage character={character} />
          <MainSheetPage character={character} />
          <MainSpellsPage character={character} />
          <MultiSpellsPage character={character} />
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    position: "relative",
    width: "100vw",
    minHeight: "100vh",
    overflowX: "hidden",
    backgroundColor: "#fcfcfc",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },
  topNavContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "16px 60px 0 60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navGroup: {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  bubbleTabButton: {
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
    padding: "24px 12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease-in-out",
  },
  verticalText: {
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.1em",
    color: "#111827",
  },
  sliderViewport: {
    width: "100vw",
    overflow: "hidden",
  },
  sliderTrack: {
    display: "flex",
    width: "500vw",
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  secondaryButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#333",
    cursor: "pointer",
    fontWeight: "600",
  },
  inspirationBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "4px 10px",
    borderRadius: "12px",
    border: "1px solid #fde68a",
  },
};
