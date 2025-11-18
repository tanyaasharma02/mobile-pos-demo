import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// ⚠️ Ensure this path is correct for your project!
import mobileAppImg from "../../assets/mobile_device.png";

export default function EssentialsPlanCard({
  cardData,
  onActionClick,
  isDisabled,
}) {
  const {
    planName,
    description,
    features,
    price,
    recommended,
    primaryButton,
    secondaryButton,
  } = cardData;

  const getIcon = (text) => {
    const t = text.toLowerCase();
    if (t.includes("monthly fee") || t.includes("pay only"))
      return <MonetizationOnOutlinedIcon />;
    if (t.includes("mobile") || t.includes("credit card"))
      return <CreditCardOutlinedIcon />;
    if (t.includes("invoice") || t.includes("receipt"))
      return <ReceiptLongOutlinedIcon />;
    return <CheckCircleOutlineIcon />;
  };

  return (
    <Card
      sx={{
        maxWidth: 340,
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "visible",
        mt: 2,
      }}
    >
      {/* Recommended Badge */}
      {recommended && (
        <Chip
          label="Recommended for you"
          color="primary"
          size="small"
          sx={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(66, 133, 244, 0.3)",
            zIndex: 2,
          }}
        />
      )}

      {/* ✅ UPDATED HERO IMAGE STYLING */}
      <Box
        sx={{
          bgcolor: "#f4f6fc",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          pt: 2,
          pb: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          // Increased height and removed padding constraints to make it larger
          height="220"
          image={mobileAppImg}
          alt="Essentials Plan"
          sx={{
            objectFit: "contain",
            width: "auto",
            maxWidth: "85%", // Prevents it from touching edges but keeps it large
            display: "block",
            margin: "0 auto",
          }}
        />
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
            {planName}
          </Typography>
          {price && (
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              {price}
            </Typography>
          )}
        </Box>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {description}
        </Typography>

        <List dense sx={{ mb: 2 }}>
          {features &&
            features.map((feature, idx) => (
              <ListItem key={idx} sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36, color: "#4285F4" }}>
                  {getIcon(feature)}
                </ListItemIcon>
                <ListItemText
                  primary={feature}
                  primaryTypographyProps={{
                    variant: "body2",
                    fontWeight: 500,
                    color: "#333",
                    lineHeight: 1.3,
                  }}
                />
              </ListItem>
            ))}
        </List>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onActionClick(primaryButton || "Add to Cart")}
            disabled={isDisabled}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1,
            }}
          >
            {primaryButton || "Add to Cart"}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => onActionClick(secondaryButton || "Learn More")}
            disabled={isDisabled}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1,
            }}
          >
            {secondaryButton || "Learn More"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
