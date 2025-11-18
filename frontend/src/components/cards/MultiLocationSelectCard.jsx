import React, { useState } from "react";

const MultiLocationSelectCard = ({
  title,
  description,
  locations,
  onSelect,
}) => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {locations.map((loc) => (
          <div
            key={loc.id}
            onClick={() => toggleSelect(loc.id)}
            className={`border rounded-xl p-2 cursor-pointer hover:border-blue-400 transition ${
              selected.includes(loc.id)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <iframe
              src={loc.mapEmbedUrl}
              className="w-full h-32 rounded-lg mb-2"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <p className="font-medium text-gray-900 text-sm">{loc.name}</p>
            <p className="text-xs text-gray-500">{loc.address}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          onSelect(selected.map((id) => locations.find((l) => l.id === id)))
        }
        disabled={selected.length === 0}
        className={`mt-4 w-full py-2 rounded-xl text-white ${
          selected.length === 0
            ? "bg-gray-300"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default MultiLocationSelectCard;
