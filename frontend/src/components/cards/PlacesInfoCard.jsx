import { Card, CardContent, Typography, Link, Box } from "@mui/material";

export default function PlacesInfoCard({ cardData }) {
  return (
    <Card
      sx={{
        mt: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600}>
          {cardData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardData.category}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          📍 {cardData.address}
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          🌐 <Link href={cardData.website}>{cardData.website}</Link>
        </Typography>
        <Typography variant="body2">📞 {cardData.phone}</Typography>
        <Typography variant="body2">
          ⭐ {cardData.reviews.rating} ({cardData.reviews.count} reviews)
        </Typography>
      </CardContent>
      <Box sx={{ height: 180 }}>
        <iframe
          src={cardData.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "0 0 16px 16px" }}
          allowFullScreen
          loading="lazy"
        />
      </Box>
    </Card>
  );
}
