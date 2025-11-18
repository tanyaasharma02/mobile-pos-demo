import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function ContactFormCard({ cardData, onActionClick }) {
  return (
    <Card
      sx={{
        mt: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Your account manager will reach out using these details.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
          <TextField
            size="small"
            label="Full Name"
            defaultValue={cardData.prefilledName}
          />
          <TextField
            size="small"
            label="Email"
            defaultValue={cardData.prefilledEmail}
          />
          <TextField
            size="small"
            label="Phone"
            defaultValue={cardData.prefilledPhone}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "30px",
            background: "linear-gradient(135deg,#4285F4,#2A3FFF)",
            color: "#fff",
          }}
          onClick={() => onActionClick("Submit Contact")}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
