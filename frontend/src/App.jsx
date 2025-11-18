// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box, Paper, Typography, Avatar, TextField, IconButton, CircularProgress, Button, Card, CardContent, Chip, Divider, ThemeProvider, createTheme, CssBaseline, Rating, Fab
// } from "@mui/material";
// import {
//   Send as SendIcon, Mic as MicIcon, VolumeUp as VolumeUpIcon, VolumeOff as VolumeOffIcon,
//   Smartphone as SmartphoneIcon, CheckCircle as CheckCircleIcon, Storefront as StorefrontIcon,
//   AddShoppingCartOutlined as AddShoppingCartOutlinedIcon, InfoOutlined as InfoOutlinedIcon, Google as GoogleIcon, PointOfSale as PointOfSaleIcon,
//   ChatBubbleOutline as ChatBubbleIcon, Close as CloseIcon, Menu as MenuIcon, Search as SearchIcon, Language as LanguageIcon, Phone as PhoneIcon
// } from "@mui/icons-material";
// import globalPaymentsLogo from "./assets/logo.svg";

// const lightTheme = createTheme({
//   palette: { mode: "light", primary: { main: "#4285F4" }, secondary: { main: "#34A853" }, gpBlue: { main: "#3300FF" }, background: { default: "#F8F9FA", paper: "#FFFFFF" } },
//   typography: { fontFamily: '"Inter", sans-serif' },
//   components: { MuiButton: { styleOverrides: { root: { borderRadius: "8px", textTransform: "none", fontWeight: 600 } } } },
// });

// // --- LANDING PAGE ---
// const LandingPage = ({ onStartChat }) => (
//   <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "#fff", overflow: "hidden" }}>
//     <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//        <img src={globalPaymentsLogo} alt="Global Payments" style={{ height: 28 }} />
//        <Box sx={{ color: "gpBlue.main", display: "flex", gap: 1 }}><SearchIcon /><MenuIcon /></Box>
//     </Box>
//     <Box sx={{ px: 3, mt: 4 }}>
//        <Typography variant="h3" fontWeight={400} sx={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>A complete worldwide commerce ecosystem.</Typography>
//        <Typography variant="h3" fontWeight={700} sx={{ color: "gpBlue.main", lineHeight: 1.1, mb: 4 }}>Delivering for you</Typography>
//        <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.5, mb: 4, color: "#444" }}>Our innovations and expertise drive growth for millions of companies—from ambitious startups to global enterprises.</Typography>
//        <Button variant="contained" size="large" sx={{ bgcolor: "gpBlue.main", borderRadius: "30px", px: 4, py: 1.5, fontSize: "1rem" }}>Talk to sales</Button>
//     </Box>
//     <Fab color="primary" onClick={onStartChat} sx={{ position: 'absolute', bottom: 24, right: 24, bgcolor: "#4285F4" }}><ChatBubbleIcon /></Fab>
//   </Box>
// );

// // --- HELPER TO GET DEVICE NAME ---
// const getMobileOperatingSystem = () => {
//   const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//   if (/android/i.test(userAgent)) return "Android Device";
//   if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS Device";
//   if (/Mac/.test(userAgent)) return "Macintosh";
//   if (/Win/.test(userAgent)) return "Windows PC";
//   return "Unknown Device";
// };

// const getChatReply = async (message, chatHistory, currentFlowState) => {
//   try {
//     // ALWAYS SEND DEVICE INFO
//     const deviceInfo = getMobileOperatingSystem();
//     const res = await fetch("http://localhost:3001/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         message,
//         chatHistory,
//         currentFlowState,
//         deviceInfo,
//       }), // Added deviceInfo
//     });
//     return await res.json();
//   } catch (e) { return { id: "err", sender: "agent", text: "Connection error.", nextFlowState: currentFlowState }; }
// };

// // --- CARDS (Unchanged visual, just re-included for completeness) ---
// const BusinessConfirmCard = ({ cardData, onActionClick, isDisabled }) => (
//   <Card sx={{ mt: -1, mb: 3, borderRadius: "16px", opacity: isDisabled ? 0.7 : 1 }}>
//     <Box sx={{ height: 150, "& iframe": { border: 0, width: "100%", height: "100%" } }}><iframe src={cardData.mapEmbedUrl} loading="lazy" title="map"></iframe></Box>
//     <CardContent sx={{ pt: 2 }}>
//       <Typography variant="h6" fontWeight={600}>{cardData.businessName}</Typography>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}><Typography variant="body2" fontWeight={600}>{cardData.rating}</Typography><Rating value={cardData.rating} precision={0.1} readOnly size="small" sx={{ color: "#FBBC04" }} /><Typography variant="body2" color="text.secondary">({cardData.reviewCount})</Typography></Box>
//       <Typography variant="body2" color="text.secondary">{cardData.category} · {cardData.address}</Typography>
//       <Typography variant="body2" sx={{ mt: 0.5, color: "#188038", fontWeight: 500 }}>{cardData.openStatus}</Typography>
//       <Divider sx={{ my: 1.5 }} />
//       <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 0.5, color: "text.secondary" }}><LanguageIcon fontSize="small" /><Typography variant="body2">{cardData.website || "geniuseats.com"}</Typography></Box>
//       <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2, color: "text.secondary" }}><PhoneIcon fontSize="small" /><Typography variant="body2">{cardData.phone || "(555) 123-4567"}</Typography></Box>
//       <Box sx={{ display: "flex", gap: 1 }}><Button variant="contained" fullWidth onClick={() => onActionClick("CONFIRM_BUSINESS_YES")} disabled={isDisabled}>Confirm</Button><Button variant="outlined" fullWidth onClick={() => onActionClick("CONFIRM_BUSINESS_NO")} disabled={isDisabled}>Not me</Button></Box>
//     </CardContent>
//   </Card>
// );
// const DeviceConfirmCard = ({ cardData, onActionClick, isDisabled }) => (
//   <Card sx={{ mt: -1, mb: 3, borderRadius: "16px", opacity: isDisabled ? 0.7 : 1 }}>
//     <CardContent>
//       <Typography variant="subtitle2" color="text.secondary" gutterBottom>DETECTED DEVICE</Typography>
//       <Typography variant="h6" fontWeight={600} gutterBottom>{cardData.deviceName}</Typography>
//       <Typography variant="body2" sx={{ mb: 2 }}>Is this your primary business device?</Typography>
//       <Box sx={{ display: "flex", gap: 1 }}><Button variant="contained" fullWidth onClick={() => onActionClick("CONFIRM_DEVICE_YES")} disabled={isDisabled}>Yes</Button><Button variant="outlined" fullWidth onClick={() => onActionClick("CONFIRM_DEVICE_NO")} disabled={isDisabled}>No</Button></Box>
//     </CardContent>
//   </Card>
// );
// const PlanRecommendationCard = ({ cardData, onActionClick, isDisabled }) => (
//   <Card sx={{ mt: -1, mb: 3, borderRadius: "16px", background: "linear-gradient(180deg, #FFF 0%, #F8F9FA 100%)", opacity: isDisabled ? 0.7 : 1 }}>
//     <CardContent sx={{ textAlign: "center", pt: 3 }}>
//       <Chip icon={<SmartphoneIcon sx={{color: "#fff !important"}}/>} label="Recommended Setup" color="primary" sx={{ mb: 2, color: "#fff", fontWeight: 600 }} />
//       <Typography variant="h5" fontWeight={700} gutterBottom>{cardData.title}</Typography>
//       {cardData.recommendedDevice && <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 1, color: "primary.main", fontWeight: 700 }}><PointOfSaleIcon fontSize="small"/>+ {cardData.recommendedDevice}</Box>}
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 3, px: 2 }}>{cardData.subtitle}</Typography>
//       <Box sx={{ textAlign: "left", mb: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>{cardData.keyBenefits.map((b, i) => (<Box key={i} sx={{ display: "flex", gap: 1.5 }}><CheckCircleIcon color="primary" fontSize="small" sx={{ mt: 0.3 }} /><Box><Typography variant="body2" fontWeight={600}>{b.title}</Typography><Typography variant="caption" color="text.secondary">{b.description}</Typography></Box></Box>))}</Box>
//       <Box sx={{ display: "flex", gap: 1 }}><Button variant="contained" fullWidth startIcon={<AddShoppingCartOutlinedIcon />} onClick={() => onActionClick("ADD_TO_CART")} disabled={isDisabled}>Add to Cart</Button><Button variant="outlined" fullWidth startIcon={<InfoOutlinedIcon />} onClick={() => onActionClick("LEARN_MORE")} disabled={isDisabled}>Learn More</Button></Box>
//     </CardContent>
//   </Card>
// );
// const AddOnCard = ({ cardData, onActionClick, isDisabled }) => (
//   <Card sx={{ mt: -1, mb: 3, borderRadius: "16px", opacity: isDisabled ? 0.7 : 1 }}>
//       <CardContent>
//           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}><Avatar sx={{ bgcolor: "#fff", border: "1px solid #eee", color: "#4285F4" }}><GoogleIcon /></Avatar><Box><Typography variant="h6" fontWeight={600}>{cardData.title}</Typography><Typography variant="subtitle2" color="secondary.main" fontWeight={700}>{cardData.price}</Typography></Box></Box>
//           <Typography variant="body2" sx={{ mb: 2 }}>{cardData.description}</Typography>
//            <Box sx={{ display: "flex", gap: 1 }}><Button variant="contained" fullWidth onClick={() => onActionClick("ADD_ADDON")} disabled={isDisabled}>Add to Plan</Button><Button fullWidth onClick={() => onActionClick("SKIP_ADDON")} disabled={isDisabled}>Skip</Button></Box>
//       </CardContent>
//   </Card>
// );
// const SummaryCard = ({ cardData, onActionClick, isDisabled }) => (
//   <Card sx={{ mt: -1, mb: 3, borderRadius: "16px", opacity: isDisabled ? 0.7 : 1 }}>
//     <CardContent>
//       <Typography variant="h6" fontWeight={700} mb={2}>Setup Summary</Typography>
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
//          <Box sx={{ display: "flex", gap: 2 }}><StorefrontIcon color="action"/><Box><Typography variant="caption">Business</Typography><Typography fontWeight={600}>{cardData.business}</Typography></Box></Box>
//          <Box sx={{ display: "flex", gap: 2 }}><CheckCircleIcon color="primary"/><Box><Typography variant="caption">Plan</Typography><Typography fontWeight={600}>{cardData.plan}</Typography></Box></Box>
//          {cardData.device && <Box sx={{ display: "flex", gap: 2 }}><PointOfSaleIcon color="primary"/><Box><Typography variant="caption">Hardware</Typography><Typography fontWeight={600}>{cardData.device}</Typography></Box></Box>}
//          {cardData.addOns?.map(a => <Box key={a} sx={{ display: "flex", gap: 2 }}><GoogleIcon color="secondary" fontSize="small"/><Box><Typography variant="caption">Add-on</Typography><Typography fontWeight={600}>{a}</Typography></Box></Box>)}
//       </Box>
//       <Button variant="contained" fullWidth size="large" onClick={() => onActionClick("FINISH_SETUP")} sx={{ borderRadius: "30px" }} disabled={isDisabled}>Begin Self-Enrollment</Button>
//     </CardContent>
//   </Card>
// );

// function App() {
//   const [showChat, setShowChat] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [isMuted, setIsMuted] = useState(false);
//   const [currentFlowState, setCurrentFlowState] = useState("INTRO");
//   const [disabledCards, setDisabledCards] = useState(new Set());
//   const chatEndRef = useRef(null);
//   const synth = useRef(window.speechSynthesis);

//   const startDemo = () => { setShowChat(true); setCurrentFlowState("GREETING"); sendMessage("Start Demo", true); };
//   const sendMessage = async (text, isAction = false) => {
//       if (!text) return;
//       synth.current.cancel(); setIsLoading(true);
//       if (!isAction) setMessages(p => [...p, { id: "u-"+Date.now(), sender: "user", text }]);
//       setMessages(p => [...p, { id: "loading", sender: "agent", text: "...", isLoading: true }]);
//       const reply = await getChatReply(text, messages.filter(m => !m.isLoading).map(m => ({ sender: m.sender, text: m.text })), currentFlowState === "INTRO" ? "GREETING" : currentFlowState);
//       setMessages(p => [...p.filter(m => m.id !== "loading"), reply]);
//       if (reply.nextFlowState) setCurrentFlowState(reply.nextFlowState);
//       if (reply.text && !isMuted) synth.current.speak(new SpeechSynthesisUtterance(reply.text.replace(/\[.*?\]/g, "")));
//       setIsLoading(false);
//   };
//   useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);
//   // --- CHANGED: SEND RAW ACTION ID INSTEAD OF TEXT FOR 100% RELIABILITY ---
//   const handleAction = (id, action) => {
//       setDisabledCards(new Set(disabledCards).add(id));
//       sendMessage(action, true); // Send the raw action ID (e.g., "CONFIRM_BUSINESS_YES")
//   };

//   if (!showChat) return <ThemeProvider theme={lightTheme}><CssBaseline /><LandingPage onStartChat={startDemo} /></ThemeProvider>;

//   return (
//     <ThemeProvider theme={lightTheme}><CssBaseline />
//       <Box sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", bgcolor: "#f0f2f5" }}>
//         <Paper elevation={4} sx={{ width: "100%", maxWidth: 400, height: "100vh", display: "flex", flexDirection: "column", borderRadius: 0 }}>
//           <Box sx={{ p: 2, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#4285F4", color: "#fff" }}>
//              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Avatar sx={{ bgcolor: "#fff", color: "primary.main" }}><GoogleIcon/></Avatar><Typography variant="subtitle1" fontWeight={600}>Genius Assistant</Typography></Box>
//              <Box><IconButton onClick={() => setIsMuted(!isMuted)} sx={{color:"#fff"}}>{isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}</IconButton><IconButton onClick={() => setShowChat(false)} sx={{color:"#fff"}}><CloseIcon /></IconButton></Box>
//           </Box>
//           <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2, bgcolor: "#F8F9FA" }}>
//              {messages.map(m => (
//                  <Box key={m.id} sx={{ mb: 2, display: "flex", flexDirection: "column", alignItems: m.sender === "agent" ? "flex-start" : "flex-end" }}>
//                      <Paper elevation={0} sx={{ p: 1.5, borderRadius: "16px", maxWidth: "85%", bgcolor: m.sender === "agent" ? "#fff" : "#4285F4", color: m.sender === "agent" ? "#000" : "#fff", border: m.sender === "agent" ? "1px solid #eee" : "none" }}>
//                          {m.isLoading ? "..." : <Typography>{m.text?.replace(/\[.*?\]/g, "")}</Typography>}
//                      </Paper>
//                      {m.uiCard && !m.isLoading && (
//                          <Box sx={{ width: "100%", maxWidth: 340, mt: 1 }}>
//                              {m.uiCard.type === "BusinessConfirmCard" && <BusinessConfirmCard cardData={m.uiCard} onActionClick={(a) => handleAction(m.id, a)} isDisabled={disabledCards.has(m.id)} />}
//                              {/* ADDED DeviceConfirmCard to render list */}
//                              {m.uiCard.type === "DeviceConfirmCard" && <DeviceConfirmCard cardData={m.uiCard} onActionClick={(a) => handleAction(m.id, a)} isDisabled={disabledCards.has(m.id)} />}
//                              {m.uiCard.type === "PlanRecommendation" && <PlanRecommendationCard cardData={m.uiCard} onActionClick={(a) => handleAction(m.id, a)} isDisabled={disabledCards.has(m.id)} />}
//                              {m.uiCard.type === "AddOnCard" && <AddOnCard cardData={m.uiCard} onActionClick={(a) => handleAction(m.id, a)} isDisabled={disabledCards.has(m.id)} />}
//                              {m.uiCard.type === "SummaryCard" && <SummaryCard cardData={m.uiCard} onActionClick={(a) => handleAction(m.id, a)} isDisabled={disabledCards.has(m.id)} />}
//                          </Box>
//                      )}
//                  </Box>
//              ))}
//              <div ref={chatEndRef} />
//           </Box>
//           <Box component="form" onSubmit={(e) => { e.preventDefault(); sendMessage(currentMessage); setCurrentMessage(""); }} sx={{ p: 2, bgcolor: "#fff", borderTop: "1px solid #eee", display: "flex", gap: 1 }}>
//              <TextField fullWidth placeholder="Type a message..." value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px", bgcolor: "#F8F9FA" } }} />
//              <IconButton type="submit" color="primary" disabled={!currentMessage.trim() || isLoading}><SendIcon /></IconButton>
//           </Box>
//         </Paper>
//       </Box>
//     </ThemeProvider>
//   );
// }
// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

