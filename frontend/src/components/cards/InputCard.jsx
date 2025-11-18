import React, { useState } from "react";
import { Card, Typography, Box, TextField, Button } from "@mui/material";

export default function InputCard({ card, sendMessage }) {
  const [val, setVal] = useState("");

  return (
    <Card sx={{ maxWidth: 350, mt: 2, p: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        {card.label || "Enter Amount"}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          label={card.placeholder}
          variant="outlined"
          size="small"
          fullWidth
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(val)}
        />
        <Button variant="contained" onClick={() => sendMessage(val)}>
          OK
        </Button>
      </Box>
    </Card>
  );
}
