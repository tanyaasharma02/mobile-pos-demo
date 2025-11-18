import { Box, Paper, Typography } from "@mui/material";
import CardRenderer from "./CardRenderer";

export default function ChatWindow({ messages, sendMessage }) {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: 2,
        backgroundColor: "#f9fafb",
      }}
    >
      {messages.map((m) => (
        <Box
          key={m.id}
          sx={{
            display: "flex",
            justifyContent: m.sender === "user" ? "flex-end" : "flex-start",
            mb: 1.5,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 1.5,
              maxWidth: "75%",
              backgroundColor: m.sender === "user" ? "#e0e7ff" : "#f3f4f6",
              borderRadius: 2,
            }}
          >
            {m.text && <Typography variant="body2">{m.text}</Typography>}
            {m.uiCard && (
              <CardRenderer card={m.uiCard} sendMessage={sendMessage} />
            )}
          </Paper>
        </Box>
      ))}
    </Box>
  );
}
