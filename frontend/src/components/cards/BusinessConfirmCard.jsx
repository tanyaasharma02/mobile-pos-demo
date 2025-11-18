import React from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  Divider,
  Link,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const BusinessConfirmCard = ({ cardData, onActionClick, isDisabled }) => {
  const {
    name,
    address,
    phone,
    website,
    hours,
    mapEmbedUrl,
    reviews = {},
  } = cardData;

  // ✅ rename display for Jake’s Plumbing
  // const displayName =
  //   name.toLowerCase().includes("jake") || name.toLowerCase().includes("plumb")
  //     ? "Jake the Plumber"
  //     : name;

  return (
    <Card
      sx={{
        borderRadius: "16px",
        p: 2,
        mt: 1.5,
        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* --- Business Name --- */}
      <Typography variant="h6" fontWeight={600}>
        {name}
      </Typography>

      {/* --- Reviews Section --- */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
        <Rating
          name="business-rating"
          value={reviews.rating || 4.8}
          precision={0.5}
          readOnly
          size="small"
        />
        <Typography variant="body2" sx={{ ml: 0.5, color: "#555" }}>
          ({reviews.count || 152} reviews)
        </Typography>
      </Box>

      {/* --- Address --- */}
      <Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
        <LocationOnIcon sx={{ color: "#4285F4", fontSize: "18px", mt: 0.2 }} />
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {address}
        </Typography>
      </Box>

      {/* --- Phone --- */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
        <PhoneIcon sx={{ color: "#4285F4", fontSize: "18px" }} />
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {phone}
        </Typography>
      </Box>

      {/* --- Website --- */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
        <LanguageIcon sx={{ color: "#4285F4", fontSize: "18px" }} />
        <Link
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{
            ml: 0.5,
            color: "#1A73E8",
            fontSize: "0.9rem",
            overflowWrap: "anywhere",
          }}
        >
          {website?.replace(/^https?:\/\//, "")}
        </Link>
      </Box>

      {/* --- Hours --- */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
        <AccessTimeIcon sx={{ color: "#4285F4", fontSize: "18px" }} />
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          {hours}
        </Typography>
      </Box>

      {/* --- Divider --- */}
      <Divider sx={{ my: 1.5 }} />

      {/* --- Google Map --- */}
      <Box
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0px 1px 5px rgba(0,0,0,0.08)",
          height: 150,
          mb: 1.5,
        }}
      >
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="150"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        />
      </Box>

      {/* --- Buttons --- */}
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={() => onActionClick("Yes")}
          sx={{
            background: "linear-gradient(90deg,#4285F4,#2A3FFF)",
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
          }}
        >
          Yes,that's me
        </Button>
        <Button
          variant="outlined"
          disabled={isDisabled}
          onClick={() => onActionClick("No")}
          sx={{
            textTransform: "none",
            color: "#4285F4",
            borderColor: "#4285F4",
            borderRadius: "8px",
            px: 3,
          }}
        >
          No, its not me
        </Button>
      </Box>
    </Card>
  );
};

export default BusinessConfirmCard;
