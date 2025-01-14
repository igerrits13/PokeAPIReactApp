const SpritesTab = ({ activeTab }) => {
  // Display sprites tab when active
  return (
    <div
      style={{
        display: activeTab === "Sprites" ? "block" : "none",
      }}
    >
      Here is the sprites tab!
    </div>
  );
};

export default SpritesTab;
