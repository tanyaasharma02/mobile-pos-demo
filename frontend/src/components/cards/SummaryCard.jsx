import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SummaryCard({ cardData, onActionClick, isDisabled }) {
  // ✅ Removed 'demoLink' from props
  const { business, plan, hardware, addOns, total, buttonLabel, title } =
    cardData;

  return (
    <Card
      sx={{
        mt: 2,
        maxWidth: 320,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Box sx={{ bgcolor: "#e8f5e9", p: 1.5, textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 32, color: "#2e7d32", mb: 0.5 }} />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#1b5e20" }}
        >
          {title || "Setup Summary"}
        </Typography>
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.65rem",
            }}
          >
            Business
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {business}
          </Typography>
        </Box>

        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: "0.65rem",
            }}
          >
            Plan & Hardware
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {plan}
          </Typography>
          {hardware && (
            <Typography
              variant="caption"
              color="primary"
              sx={{ fontWeight: 600, fontSize: "0.75rem" }}
            >
              + {hardware}
            </Typography>
          )}
        </Box>

        {addOns && addOns.length > 0 && (
          <Box sx={{ mb: 1.5 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                fontWeight: 700,
                fontSize: "0.65rem",
              }}
            >
              Add-ons
            </Typography>
            <List dense disablePadding>
              {addOns.map((addon, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemText
                    primary={`• ${addon}`}
                    primaryTypographyProps={{
                      variant: "caption",
                      fontSize: "0.75rem",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Divider sx={{ my: 1.5 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Total Estimated:
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            {total}
          </Typography>
        </Box>

        {/* ✅ Only Enrollment Button remains */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => onActionClick(buttonLabel)}
          disabled={isDisabled}
          sx={{ borderRadius: 2, fontWeight: 700, fontSize: "0.85rem", py: 1 }}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
}
