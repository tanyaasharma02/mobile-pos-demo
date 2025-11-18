import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import { CheckCircle as CheckIcon } from "@mui/icons-material";

export default function CompetitorComparisonCard({ cardData }) {
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
          Genius vs {cardData.competitor}
        </Typography>
        <List dense>
          {cardData.highlights.map((h, i) => (
            <ListItem key={i} sx={{ py: 0.5 }}>
              <CheckIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="body2">{h}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
