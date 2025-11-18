import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { EventAvailable as EventAvailableIcon } from "@mui/icons-material";

export default function BookingCard({ cardData, onActionClick }) {
  return (
    <Card
      sx={{
        mt: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <EventAvailableIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Schedule Meeting
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Choose a convenient slot for your onboarding consultation.
        </Typography>
        <Stack spacing={1}>
          {cardData.availableSlots.map((slot, i) => (
            <Button
              key={i}
              variant="outlined"
              sx={{
                borderRadius: "30px",
                borderColor: "#4285F4",
                color: "#4285F4",
                "&:hover": {
                  background: "linear-gradient(135deg,#4285F4,#2A3FFF)",
                  color: "#fff",
                },
              }}
              onClick={() => onActionClick(slot)}
            >
              {slot}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
