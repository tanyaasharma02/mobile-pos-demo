import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Badge,
} from "@mui/material";
import {
  Send as SendIcon,
  Close as CloseIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import globalLogo from "../assets/logo.svg";

import {
  BusinessConfirmCard,
  EssentialsPlanCard,
  GoogleAddonCard,
  SummaryCard,
  DeviceTypeCompareCard,
  AppWalkthroughCard,
  InputCard,
  SliderCard,
  ContactFormCard,
} from "../components/cards";

// ✅ GLOBAL PAYMENTS THEME
const theme = createTheme({
  palette: {
    primary: { main: "#005EB8" }, // Global Payments Blue
    secondary: { main: "#00A4E4" }, // Cyan Accent
    background: { default: "#F4F6F8" }, // Light gray background
    text: { primary: "#1D252D", secondary: "#535F6B" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: "none", fontWeight: 600 }, // Modern buttons
  },
});

export default function ChatPage({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [flow, setFlow] = useState("GREETING");
  const [disabled, setDisabled] = useState(new Set());
  const [cartCount, setCartCount] = useState(0);
  const chatEnd = useRef(null);

  useEffect(
    () => chatEnd.current?.scrollIntoView({ behavior: "smooth" }),
    [messages]
  );

  useEffect(() => {
    if (messages.length === 0) {
      const timeout = setTimeout(() => {
        sendMessage("Start Demo", true);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, []);

  const sendMessage = async (msg, isAction = false) => {
    if (!msg) return;

    if (
      msg.toLowerCase().includes("add") ||
      msg.toLowerCase().includes("cart")
    ) {
      setCartCount((prev) => prev + 1);
    }

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: msg },
    ]);

    try {
      const res = await fetch(
        "https://mobile-merch-backend-921315025173.us-central1.run.app/api/chat",
        // "http://localhost:8080/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: msg, currentFlowState: flow }),
        }
      );
      const data = await res.json();
      setFlow(data.nextFlowState);
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleCardAction = (id, action) => {
    setDisabled(new Set(disabled).add(id));
    sendMessage(action, true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "#E5E9F2",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 420,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* ✅ HEADER: Global Payments Gradient */}
          <Box
            sx={{
              p: 2,
              background: "linear-gradient(90deg, #005EB8 0%, #003DA5 100%)",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 10px rgba(0,94,184,0.2)",
            }}
          >
            <Box
              component="img"
              src={globalLogo}
              sx={{ height: 26, filter: "brightness(0) invert(1)" }}
            />
            <Box>
              <IconButton sx={{ color: "#fff", mr: 1 }}>
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton onClick={onClose} sx={{ color: "#fff" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Chat Area */}
          <Box
            sx={{ flexGrow: 1, overflowY: "auto", p: 2, bgcolor: "#F4F6F8" }}
          >
            {messages.map((m) => (
              <Box
                key={m.id}
                sx={{
                  mb: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: m.sender === "agent" ? "flex-start" : "flex-end",
                }}
              >
                <Paper
                  sx={{
                    p: "10px 14px",
                    borderRadius:
                      m.sender === "agent"
                        ? "12px 12px 12px 2px"
                        : "12px 12px 2px 12px",
                    maxWidth: "85%",
                    bgcolor: m.sender === "agent" ? "#fff" : "#005EB8",
                    color: m.sender === "agent" ? "#1D252D" : "#fff",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.text}
                  </ReactMarkdown>
                </Paper>

                {m.uiCard && (
                  <Box sx={{ width: "100%", maxWidth: 360, mt: 1.5 }}>
                    {m.uiCard.type === "BusinessConfirmCard" && (
                      <BusinessConfirmCard
                        cardData={m.uiCard}
                        onActionClick={(a) => handleCardAction(m.id, a)}
                        isDisabled={disabled.has(m.id)}
                      />
                    )}
                    {m.uiCard.type === "InputCard" && (
                      <InputCard card={m.uiCard} sendMessage={sendMessage} />
                    )}
                    {m.uiCard.type === "SliderCard" && (
                      <SliderCard card={m.uiCard} sendMessage={sendMessage} />
                    )}
                    {m.uiCard.type === "DeviceTypeCompareCard" && (
                      <DeviceTypeCompareCard
                        cardData={m.uiCard}
                        onActionClick={(a) => handleCardAction(m.id, a)}
                      />
                    )}
                    {m.uiCard.type === "EssentialsPlanCard" && (
                      <EssentialsPlanCard
                        cardData={m.uiCard}
                        onActionClick={(a) => handleCardAction(m.id, a)}
                        isDisabled={disabled.has(m.id)}
                      />
                    )}
                    {m.uiCard.type === "AppWalkthroughCard" && (
                      <AppWalkthroughCard
                        cardData={m.uiCard}
                        onActionClick={(a) => handleCardAction(m.id, a)}
                      />
                    )}
                    {m.uiCard.type === "GoogleAddonCard" && (
                      <GoogleAddonCard
                        cardData={m.uiCard}
                        onActionClick={(a) => handleCardAction(m.id, a)}
                        isDisabled={disabled.has(m.id)}
                      />
                    )}
                    {m.uiCard.type === "SummaryCard" && (
                      <SummaryCard
                        cardData={m.uiCard}
                        onActionClick={(a) => handleCardAction(m.id, a)}
                        isDisabled={disabled.has(m.id)}
                      />
                    )}
                    {m.uiCard.type === "ContactFormCard" && (
                      <ContactFormCard
                        cardData={m.uiCard}
                        onActionClick={(a) => handleCardAction(m.id, a)}
                      />
                    )}
                  </Box>
                )}
              </Box>
            ))}
            <div ref={chatEnd} />
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#fff",
              display: "flex",
              gap: 1,
              borderTop: "1px solid #EAEEF2",
            }}
          >
            <TextField
              fullWidth
              placeholder="Type your message..."
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim()) {
                    sendMessage(input);
                    setInput("");
                  }
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "24px",
                  bgcolor: "#F4F6F8",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#CED4DA" },
                  "&.Mui-focused fieldset": { borderColor: "#005EB8" },
                },
              }}
            />
            <IconButton
              sx={{
                color: "#005EB8",
                bgcolor: "#E1F0FA",
                "&:hover": { bgcolor: "#D2E5F5" },
              }}
              onClick={() => {
                sendMessage(input);
                setInput("");
              }}
              disabled={!input.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
