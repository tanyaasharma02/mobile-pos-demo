import React, { useState } from "react";
import { Card, Typography, Slider, Button } from "@mui/material";

export default function SliderCard({ card, sendMessage }) {
  // ✅ Destructure 'prefix' (defaults to empty string if missing)
  const { label, min, max, step, defaultValue, prefix = "" } = card;

  const [val, setVal] = useState(defaultValue || 50);

  const handleChange = (event, newValue) => {
    setVal(newValue);
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        mt: 2,
        p: 2.5,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Typography
        variant="subtitle2"
        gutterBottom
        sx={{ fontWeight: 600, color: "#555" }}
      >
        {label}
      </Typography>

      {/* ✅ DISPLAY PREFIX (e.g. "$50" or "30") */}
      <Typography
        variant="h3"
        color="primary"
        align="center"
        gutterBottom
        sx={{ fontWeight: 700, my: 2 }}
      >
        {prefix}
        {val}
      </Typography>

      <Slider
        value={val}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{ mb: 3, height: 8 }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={() => sendMessage(`${prefix}${val}`)} // Sends "$50" or "30" back to chat
        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, py: 1 }}
      >
        Confirm {prefix}
        {val}
      </Button>
    </Card>
  );
}
