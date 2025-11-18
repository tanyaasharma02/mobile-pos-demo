import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Button,
  Box,
} from "@mui/material";
import { WorkspacePremium as WorkspacePremiumIcon } from "@mui/icons-material";

export default function HighValuePlansCard({ cardData, onActionClick }) {
  return (
    <Card
      sx={{
        mt: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <WorkspacePremiumIcon color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Enterprise Plans
          </Typography>
        </Box>
        <List dense>
          {cardData.plans.map((p, i) => (
            <ListItem key={i} sx={{ py: 0.5 }}>
              <Typography variant="body2" fontWeight={600}>
                {p.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                — {p.price}
              </Typography>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            borderRadius: "30px",
            background: "linear-gradient(135deg,#4285F4,#2A3FFF)",
            color: "#fff",
          }}
          onClick={() => onActionClick("Contact Sales")}
        >
          Contact Sales
        </Button>
      </CardContent>
    </Card>
  );
}
