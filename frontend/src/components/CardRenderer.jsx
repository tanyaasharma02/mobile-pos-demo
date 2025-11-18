import React from "react";

// 1. Manually import the cards to bypass any 'index.js' issues
import InputCard from "./cards/InputCard";
import SliderCard from "./cards/SliderCard";
import BusinessConfirmCard from "./cards/BusinessConfirmCard";
// Add other imports here if you need them later, but these are the ones breaking now.
sjkmakakmsksmakamaka

export default function CardRenderer({ card, sendMessage }) {
  if (!card) return null;
aaka
  console.log("Rendering Card:", card.type); // Check your console for this!

  // 2. Manual Switch Statement - 100% Reliable
  switch (card.type) {
    case "InputCard":
      return <InputCard card={card} sendMessage={sendMessage} />;

    case "SliderCard":
      return <SliderCard card={card} sendMessage={sendMessage} />;

    case "BusinessConfirmCard":
      return <BusinessConfirmCard card={card} sendMessage={sendMessage} />;

    // Fallback for other cards (if you still use the index method for them)
    default:
      return (
        <div style={{ padding: 10, border: "2px dashed red", color: "red" }}>
          ⚠️ Card Type <strong>{card.type}</strong> not linked in
          CardRenderer.jsx
        </div>
      );
  }
}
