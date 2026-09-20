import { useParams, useNavigate } from "react-router-dom";

export function CharacterSheet() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button style={styles.secondaryButton} onClick={() => navigate("/")}>
        ← Back to Dashboard
      </button>
      <h1 style={{ marginTop: "20px" }}>Character Sheet (ID: {id})</h1>
      <p>Character details will go here...</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "24px",
    fontFamily: "sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  secondaryButton: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
};
