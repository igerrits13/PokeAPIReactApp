const MovesTab = ({ activeTab }) => {
  // Display moves tab when active
  return (
    <div
      style={{
        display: activeTab === "Moves" ? "block" : "none",
      }}
    >
      Here is the Moves tab!
    </div>
  );
};

export default MovesTab;
