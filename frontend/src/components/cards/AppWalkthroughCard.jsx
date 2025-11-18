import React from "react";
import { Card, Typography, Box, Button } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const AppWalkthroughCard = ({
  cardData,
  onPrimaryAction,
  onSecondaryAction,
}) => {
  const {
    title = "Genius App Walkthrough",
    description = "Preview how to take payments, send invoices, and manage your business on the go.",
    primaryButton = "Start Demo",
    secondaryButton = "Back to Plan",
    link = "https://globalpaydemo.geniusapp.live/", // 👈 link to open on Start Demo
  } = cardData;

  return (
    <Card
      sx={{
        p: 2.5,
        mt: 1.5,
        borderRadius: "16px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        bgcolor: "#fff",
        textAlign: "center",
      }}
    >
      <Box sx={{ mb: 1.5 }}>
        <SmartphoneIcon sx={{ fontSize: 36, color: "#2A3FFF" }} />
      </Box>

      <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* 🌐 Opens live link */}
        <Button
          onClick={() => window.open(link, "_blank")}
          variant="contained"
          sx={{
            background: "linear-gradient(135deg,#4285F4,#2A3FFF)",
            textTransform: "none",
            borderRadius: "10px",
            px: 3,
          }}
        >
          {primaryButton}
        </Button>

        <Button
          onClick={onSecondaryAction}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            borderColor: "#4285F4",
            color: "#4285F4",
          }}
        >
          {secondaryButton}
        </Button>
      </Box>
    </Card>
  );
};

export default AppWalkthroughCard;
