// src/pages/SkipSelector.jsx
import { useEffect, useState } from "react";
import SkipCard from "./SkipCard";
import "../css/SkipSelector.css";

const API_URL = "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

function SkipSelector() {
  const [skips, setSkips] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skips");
        return res.json();
      })
      .then((data) => {
        // Tambahkan properti image ke setiap skip berdasarkan ukurannya
        const skipsWithImages = data.map(skip => {
          let image = "";
          switch (skip.size) {
            case 4:
              image = "img/4-yarder-skip.jpg";
              break;
            case 6:
              image = "img/6-yarder-skip.jpg";
              break;
            case 8:
              image = "img/8-yarder-skip.jpg";
              break;
            case 10:
              image = "img/10-yarder-skip.jpg";
              break;
            case 12:
              image = "img/12-yarder-skip.jpg";
              break;
            case 14:
              image = "img/14-yarder-skip.jpg";
              break;
            case 16:
              image = "img/16-yarder-skip.jpg";
              break;
            case 20:
              image = "img/20-yarder-skip.jpg";
              break;
            case 40:
              image = "img/40-yarder-skip.jpg";
              break;
            default:
              image = "img/default-skip.jpg"; // Gambar default jika ukuran tidak cocok
          }
          return { ...skip, image: image };
        });
        setSkips(skipsWithImages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="skip-selector">
      <h1>Choose Your Skip</h1>
      <p>Select the skip size that best fits your needs</p>

      {loading && <div className="loader">Loading skips...</div>}
      {error && <div className="error">⚠️ {error}</div>}

      <div className="skip-grid">
        {!loading &&
          !error &&
          skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              selected={selected === skip.id}
              onSelect={() => setSelected(skip.id)}
            />
          ))}
      </div>
{selected && (
  <div className="selected-skip-summary">
    {(() => {
      const selectedSkip = skips.find((s) => s.id === selected);
      return selectedSkip ? (
        <div className="summary-card">
          <img
            src={selectedSkip.image}
            alt={`${selectedSkip.size} yard`}
            className="summary-image"
          />
          <div className="summary-info">
            <h4>{selectedSkip.size} Yard Skip</h4>
            <p>£{selectedSkip.price || '-'}</p>
          </div>
        </div>
      ) : null;
    })()}
  </div>
)}


      {selected && (
        <button className="continue-btn">Continue</button>
      )}
    </div>
  );
}

export default SkipSelector;
