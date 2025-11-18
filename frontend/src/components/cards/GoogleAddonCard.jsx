import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function GoogleAddonCard({
  cardData,
  onActionClick,
  isDisabled,
}) {
  const { addon, cost, description } = cardData;

  return (
    // ✅ REDUCED MAXWIDTH TO 300px
    <Card
      sx={{
        maxWidth: 300,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <StarIcon sx={{ color: "#4285F4", fontSize: 20 }} />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: "0.95rem" }}
          >
            {addon || "Google Business Profile & Ads Add-on"}
          </Typography>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1.5, display: "block", lineHeight: 1.4 }}
        >
          {description ||
            "Boost your visibility on Google Search & Maps with automated sync."}
        </Typography>

        <Box
          sx={{
            bgcolor: "#e8f5e9",
            borderRadius: 1,
            p: 0.75,
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
          }}
        >
          <TrendingUpIcon sx={{ fontSize: 16, color: "#2e7d32" }} />
          <Typography
            variant="caption"
            sx={{
              color: "#2e7d32",
              fontSize: "0.7rem",
              fontWeight: 700,
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Users see 15% more engagement!
          </Typography>
        </Box>

        <Typography
          variant="subtitle2"
          sx={{ mb: 1.5, fontWeight: 700, color: "#1a1a1a" }}
        >
          {cost || "$10/month"}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={() => onActionClick("Yes, Add it")}
            disabled={isDisabled}
            sx={{ textTransform: "none", borderRadius: 2, fontWeight: 600 }}
          >
            Add Add-on
          </Button>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            onClick={() => onActionClick("Skip")}
            disabled={isDisabled}
            sx={{ textTransform: "none", borderRadius: 2, fontWeight: 600 }}
          >
            Skip
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
