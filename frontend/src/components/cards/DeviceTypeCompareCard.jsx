import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Link,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// Removed TrendingUpIcon import
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import CloseIcon from "@mui/icons-material/Close";

import mobileDeviceImg from "../../assets/mobile_device.png";
import handheldDeviceImg from "../../assets/handheld_device.png";

const DEMO_LINK = "https://livewire-ui-921315025173.us-central1.run.app/";

export default function DeviceTypeCompareCard({ cardData, onActionClick }) {
  const { plans, recommended } = cardData;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const compatibleDevices = [
    "Samsung Galaxy S10 and newer",
    "Google Pixel 4 and above",
    "OnePlus 9 and newer",
    "Nothing Phone 1 & 2",
    "Motorola Edge+",
  ];

  return (
    <>
      {/* Animation Styles */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {Object.entries(plans).map(([key, plan]) => {
          const isRec = key === recommended?.toLowerCase();
          const isMobile = key === "mobile";

          return (
            <Card
              key={key}
              sx={{
                flex: 1,
                minWidth: 0,
                p: 2,
                border: isRec ? "2px solid #005EB8" : "1px solid #e0e0e0",
                borderRadius: "20px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                bgcolor: isMobile ? "#fafafa" : "#fff",
                boxShadow: isRec ? "0 6px 16px rgba(0, 94, 184, 0.15)" : "none",
              }}
            >
              {isRec && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "#005EB8",
                    color: "white",
                    px: 1.5,
                    py: 0.5,
                    borderBottomLeftRadius: 12,
                    borderTopRightRadius: "18px",
                    fontSize: "0.65rem",
                    fontWeight: "bold",
                    zIndex: 1,
                  }}
                >
                  Recommended
                </Box>
              )}

              {/* --- HEADER --- */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    mt: 1,
                    height: 90,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={isMobile ? mobileDeviceImg : handheldDeviceImg}
                    alt={plan.title}
                    sx={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      width: "auto",
                    }}
                  />
                </Box>

                <Typography
                  variant="subtitle1"
                  align="center"
                  gutterBottom
                  color={isMobile ? "text.secondary" : "text.primary"}
                  sx={{ fontWeight: 700, lineHeight: 1.2 }}
                >
                  {plan.title}
                </Typography>

                {isMobile ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                      mb: 1,
                      color: "#d32f2f",
                      minHeight: 30,
                    }}
                  >
                    <ErrorOutlineIcon sx={{ fontSize: 16 }} />
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      sx={{ fontSize: "0.7rem", lineHeight: 1 }}
                    >
                    Requires Mobile device with NFC support
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    align="center"
                    display="block"
                    sx={{
                      mb: 1.5,
                      lineHeight: 1.3,
                      fontSize: "0.75rem",
                      minHeight: 30,
                    }}
                  >
                    {plan.tagline}
                  </Typography>
                )}
              </Box>

              {/* --- CONTENT --- */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                {/* ❌ REMOVED 15% ENGAGEMENT BADGE FROM HERE */}

                <List
                  dense
                  sx={{
                    bgcolor: isMobile ? "#f5f5f5" : "#f8f9fa",
                    borderRadius: 2,
                    p: 1,
                    width: "100%",
                  }}
                >
                  {isMobile ? (
                    <ListItem sx={{ py: 0.25, px: 0.5, textAlign: "center" }}>
                      <ListItemText
                        primary="Suitable for: Field Services"
                        primaryTypographyProps={{
                          fontSize: "0.75rem",
                          color: "text.secondary",
                          fontWeight: 500,
                        }}
                      />
                    </ListItem>
                  ) : (
                    plan.bestFor &&
                    plan.bestFor.map((item, idx) => (
                      <ListItem key={idx} sx={{ py: 0.25, px: 0.5 }}>
                        <ListItemText
                          primary={`• ${item}`}
                          primaryTypographyProps={{
                            fontSize: "0.75rem",
                            color: "text.secondary",
                            fontWeight: 500,
                          }}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
              </Box>

              {/* --- FOOTER ACTIONS --- */}
              <Box sx={{ mt: "auto", textAlign: "center" }}>
                {isMobile ? (
                  <>
                    <Link
                      component="button"
                      variant="caption"
                      onClick={handleOpen}
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#005EB8",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        mb: 1.5,
                        display: "block",
                      }}
                    >
                      Compatible Devices
                    </Link>
                    <Button
                      variant="contained"
                      fullWidth
                      size="small"
                      onClick={() => onActionClick("I will upgrade my device")}
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        mb: 1,
                        borderRadius: "10px",
                        bgcolor: "#005EB8",
                        lineHeight: 1.2,
                        py: 1,
                        "&:hover": { bgcolor: "#004C99" },
                      }}
                    >
                      I WILL UPGRADE MY DEVICE
                    </Button>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        border: "1px solid #90caf9",
                        borderRadius: 1.5,
                        p: 0.75,
                        mb: 1.5,
                        textAlign: "center",
                        bgcolor: "#e3f2fd",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.7rem",
                          color: "#1565c0",
                          fontWeight: 600,
                          lineHeight: 1.3,
                          display: "block",
                        }}
                      >
                        Compatible: Essentials, Advanced & Complete
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      size="small"
                      onClick={() => onActionClick("Add Handheld to Cart")}
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        py: 0.8,
                        mb: 1,
                        borderRadius: "10px",
                        bgcolor: "#005EB8",
                        "&:hover": { bgcolor: "#004C99" },
                      }}
                    >
                      ADD TO CART
                    </Button>
                  </>
                )}

                {/* Premium Demo Button */}
                <Button
                  variant="text"
                  fullWidth
                  size="small"
                  startIcon={
                    <PlayCircleFilledWhiteIcon
                      sx={{ fontSize: "1.1rem !important" }}
                    />
                  }
                  onClick={() => window.open(DEMO_LINK, "_blank")}
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    textTransform: "none",
                    borderRadius: "10px",
                    bgcolor: "#E1F0FA",
                    color: "#005EB8",
                    py: 1,
                    "&:hover": { bgcolor: "#D2E5F5" },
                    "& .MuiButton-startIcon": {
                      animation: "pulse 2s infinite ease-in-out",
                    },
                  }}
                >
                  INTERACTIVE LIVE DEMO
                </Button>
              </Box>
            </Card>
          );
        })}
      </Box>

      {/* POPUP */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "1rem",
            fontWeight: 700,
          }}
        >
          Compatible Devices
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List dense>
            {compatibleDevices.map((device, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`• ${device}`}
                  primaryTypographyProps={{ fontSize: "0.9rem" }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            fullWidth
            sx={{ m: 1, borderRadius: 2, bgcolor: "#005EB8" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
