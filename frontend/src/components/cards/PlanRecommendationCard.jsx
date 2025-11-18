import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
} from "@mui/material";
import { Smartphone as SmartphoneIcon } from "@mui/icons-material";

export default function PlanRecommendationCard({
  cardData,
  onActionClick,
  isDisabled,
}) {
  return (
    <Card
      sx={{
        mt: 2,
        borderRadius: 2,
        background: "linear-gradient(180deg,#FFF 0%,#F8F9FA 100%)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Chip
          icon={<SmartphoneIcon sx={{ color: "#fff!important" }} />}
          label="Recommended Setup"
          sx={{
            mb: 2,
            bgcolor: "#4285F4",
            color: "#fff",
            fontWeight: 600,
          }}
        />
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {cardData.planName}
        </Typography>
        <Typography variant="body1" color="primary" fontWeight={600}>
          {cardData.price}
        </Typography>
        <List dense sx={{ textAlign: "left" }}>
          {cardData.features?.map((f, i) => (
            <ListItem key={i} sx={{ py: 0 }}>
              • {f}
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(135deg,#4285F4,#2A3FFF)",
              color: "#fff",
              borderRadius: "30px",
            }}
            onClick={() => onActionClick("Select Plan")}
            disabled={isDisabled}
          >
            {cardData.primaryButton || "Select Plan"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => onActionClick("Learn More")}
            disabled={isDisabled}
          >
            Learn More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
