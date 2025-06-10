// src/pages/SkipCard.jsx
import "../css/SkipCard.css"; // untuk styling nanti

function SkipCard({ skip, selected, onSelect }) {
  console.log(skip); // Tambahkan ini untuk debugging

  return (
    <div
      className={`skip-card ${selected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <img src={skip.image} alt={`${skip.size} Yard Skip`} />
      <h3>{skip.size} Yard Skip</h3>
      <p>{skip.hire_period} hire period</p>
      <p className="price">£{skip.price}</p>
      <button className="select-btn">
        {selected ? "Selected" : "Select This Skip"}
      </button>
    </div>
  );
}

export default SkipCard;
