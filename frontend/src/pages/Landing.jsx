import { Box, Button, Typography, AppBar, Toolbar, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Navigation Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "#fff", color: "#000", borderBottom: "1px solid #e2e8f0" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#2b2b2b" }}
          >
            <span style={{ color: "#2a3cff" }}>global</span>payments
          </Typography>

          <Button
            sx={{
              textTransform: "none",
              color: "#2a3cff",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
          py: 6,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            maxWidth: "800px",
            fontWeight: 700,
            color: "#1e293b",
            lineHeight: 1.2,
          }}
        >
          A complete worldwide commerce ecosystem.
          <br />
          <span style={{ color: "#2a3cff" }}>Delivering for you</span>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: "600px",
            mt: 3,
            color: "#475569",
            fontSize: "1.1rem",
          }}
        >
          Our innovations and expertise drive growth for millions of companies — from ambitious startups to financial institutions and global enterprises.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 5,
            backgroundColor: "#2a3cff",
            color: "#fff",
            borderRadius: 10,
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontSize: "1rem",
            boxShadow: "0 4px 10px rgba(42,60,255,0.2)",
            "&:hover": { backgroundColor: "#1f32cc" },
          }}
          onClick={() => navigate("/chat")}
          startIcon={<ChatIcon />}
        >
          Talk to Sales
        </Button>
      </Box>

      {/* Floating Chat Button */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => navigate("/chat")}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "#2a3cff",
          boxShadow: "0px 4px 12px rgba(42,60,255,0.4)",
          "&:hover": { backgroundColor: "#1f32cc" },
        }}
      >
        <ChatIcon />
      </Fab>
    </Box>
  );
}
