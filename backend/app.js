const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const UAParser = require("ua-parser-js");

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

// ----------------------------
// 🧠 DEMO SESSION STATE
// ----------------------------
let sessionData = {
  businessName: "", // Start empty
  hardware: "Mobile App Only",
};

// ----------------------------
// 🧠 Data: Default Low Value
// ----------------------------
const mapsDataLow = {
  id: "jake-plumber",
  address: "3270 Kino Ave #1, Kingman, AZ 86409, United States",
  category: "Plumbing Service",
  website: "https://www.jakesplumbingservices.com",
  phone: "+1 (928) 555-2938",
  hours: "Mon–Fri: 9 AM – 5 PM",
  reviews: { rating: 3.9, count: 152 },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.3670439179!2d-114.0257182847368!3d35.19284998031087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d1e5b1c1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sJake%E2%80%99s%20Plumbing%20Services!5e0!3m2!1sen!2sus!4v1629999999999!5m2!1sen!2sus",
};

// ----------------------------
// ⚙️ Chat Flow Logic
// ----------------------------
app.post("/api/chat", async (req, res) => {
  const { message, currentFlowState } = req.body;

  const ua = new UAParser(req.headers["user-agent"]);
  const device = ua.getDevice();
  const os = ua.getOS().name;
  const detectedDeviceName =
    device.type === "mobile" || device.type === "tablet"
      ? `${os} Device`
      : "Desktop/Laptop";

  let text = "";
  let nextFlowState = currentFlowState;
  let uiCard = null;

  try {
    switch (currentFlowState) {
      // -----------------------------
      // 1. ENTRY & GREETING
      // -----------------------------
      case "GREETING":
      default: {
        const lowerMsg = message ? message.toLowerCase().trim() : "";

        if (!message || /start demo/i.test(lowerMsg)) {
          text =
            " Hi there! I’m your Global Payments Assistant here to help you choose the best Point of Sale solution. In order to help you could you please provide your Business name, City and State where you are located?";
          nextFlowState = "GREETING";
        } else if (/^hi$|^hello$|^hey$/i.test(lowerMsg)) {
          text = "Hello! To get started, please type your business name.";
          nextFlowState = "GREETING";
        } else {
          const userBusinessName = message.trim();
          const dynamicWebsite = `www.${userBusinessName
            .replace(/[^a-zA-Z0-9]/g, "")
            .toLowerCase()}.com`;

          sessionData.businessName = userBusinessName;

          text = `We found these details for **${userBusinessName}** from Google Maps. Please confirm if this is your business.`;
          nextFlowState = "CONFIRM_LOW";

          uiCard = {
            type: "BusinessConfirmCard",
            ...mapsDataLow,
            name: userBusinessName,
            website: dynamicWebsite,
            primaryButton: "Yes, that's me",
            secondaryButton: "No, search again",
          };
        }
        break;
      }

      // -----------------------------
      // 2. CONFIRM -> ASK AVG TXN
      // -----------------------------
      case "CONFIRM_LOW":
        if (/yes/i.test(message)) {
          text =
            "Great! To find the right fit, what is your **Average Transaction Amount**?";
          nextFlowState = "ASK_AVG_TXN";

          uiCard = {
            type: "SliderCard",
            min: 0,
            max: 500,
            step: 5,
            label: "Avg Transaction Value",
            defaultValue: 50,
            prefix: "$", // ✅ ADDED: Shows '$' for money
          };
        } else {
          text = "No worries — please type your business name again.";
          nextFlowState = "GREETING";
        }
        break;

      case "ASK_AVG_TXN":
        text =
          "And finally, roughly how many **transactions per month** do you process?";
        nextFlowState = "ASK_TXN_COUNT";
        uiCard = {
          type: "SliderCard",
          min: 0,
          max: 200,
          step: 5,
          label: "Monthly Transactions",
          defaultValue: 30,
          prefix: "", // ✅ ADDED: Empty string (No symbol for count)
        };
        break;
      // -----------------------------
      // 3. RECOMMENDATION
      // -----------------------------
      case "ASK_TXN_COUNT":
        text = `Based on your business profile and device type here are the recommended solutions`;
        nextFlowState = "WAIT_FOR_DEVICE_CHOICE";

        uiCard = {
          type: "DeviceTypeCompareCard",
          recommended: "Handheld",
          plans: {
            mobile: {
              title: "Mobile App",
              tagline: "Requires compatible phone",
              compatible: "Essentials Plan",
              bestFor: ["Pop-ups", "Event Sales"],
            },
            handheld: {
              title: "Genius Handheld",
              tagline: "All-in-one device (Recommended)",
              compatible: "Essentials Plan + Hardware",
              bestFor: ["In-store", "Field Services"],
            },
          },
        };
        break;

      // -----------------------------
      // 4. DEVICE CHOICE HANDLER
      // -----------------------------
      case "WAIT_FOR_DEVICE_CHOICE":
        if (
          /what device|support|mobile payments/i.test(message) ||
          /upgrade/i.test(message)
        ) {
          sessionData.hardware = "Mobile App Only";

          // ✅ UPDATED: Short & Crisp Text
          text = "Perfect! We recommend the **Mobile Essentials** plan.";

          nextFlowState = "PLAN_SELECTION_LOW";

          uiCard = {
            type: "EssentialsPlanCard",
            planName: "Essentials",
            description: "Ideal for businesses on the go.",
            features: [
              "No Monthly Fee",
              "Mobile Payments",
              "Digital Invoicing",
            ],
            primaryButton: "Add to Cart",
            secondaryButton: "Learn More",
            recommended: true,
          };
        } else if (/handheld/i.test(message)) {
          sessionData.hardware = "Genius Handheld";
          text =
            "Great choice. The **Genius Handheld** has been added to your cart...";
          nextFlowState = "ADD_ADDON_LOW";
          uiCard = {
            type: "GoogleAddonCard",
            addon: "Google Business Profile & Ads Add-on",
            cost: "$10/month",
            description:
              "Boost your visibility on Google Search & Maps with automated sync.",
            primaryButton: "Add Add-on",
            secondaryButton: "Skip",
          };
        } else {
          text = "Please select **Mobile** or **Handheld**.";
          nextFlowState = "WAIT_FOR_DEVICE_CHOICE";
        }
        break;

      // -----------------------------
      // 5. PLAN SELECTION
      // -----------------------------
      case "PLAN_SELECTION_LOW":
        if (/learn/i.test(message)) {
          text = "Would you like a **guided walkthrough** of the Genius App?";
          nextFlowState = "OFFER_WALKTHROUGH";
          uiCard = {
            type: "DeviceConfirmCard",
            deviceName: "Interactive Demo",
            description: "See the Gemini Live Flow of the mobile app.",
            primaryButton: "Yes, show me",
            secondaryButton: "No, skip",
          };
        } else if (/add|cart/i.test(message)) {
          text =
            "Great choice! We also noticed your Google profile could use more engagement. Would you like to add the **Google Business Profile & Ads Add-on** for **$10/month**?";
          nextFlowState = "ADD_ADDON_LOW";
          uiCard = {
            type: "GoogleAddonCard",
            addon: "Google Business Profile & Ads Add-on",
            cost: "$10/month",
            description: "Boost visibility on Google Search & Maps.",
            primaryButton: "Add Add-on",
            secondaryButton: "Skip",
          };
        } else {
          text =
            "You can either **Add to Cart** or **Learn More** about the Essentials plan.";
          nextFlowState = "PLAN_SELECTION_LOW";
        }
        break;

      // -----------------------------
      // 6. UPSELL -> SUMMARY
      // -----------------------------
      case "ADD_ADDON_LOW": {
        const addedLow = /yes|add|sure/i.test(message);

        if (addedLow) {
          text = "Smart choice! Added the Google Add-on to your plan.";
        } else if (/skip|no/i.test(message)) {
          text = "No problem, you can always add it later.";
        } else {
          text =
            "Please confirm — would you like to add the Google Add-on? (Add / Skip)";
          nextFlowState = "ADD_ADDON_LOW";
          break;
        }

        nextFlowState = "SUMMARY_LOW";

        uiCard = {
          type: "SummaryCard",
          title: "Purchase Summary",
          business: sessionData.businessName,
          plan: "Essentials Plan",
          hardware: sessionData.hardware,
          addOns: addedLow
            ? ["Google Business Profile & Ads Add-on ($10/mo)"]
            : [],
          total: addedLow ? "$10/month + processing" : "$0/month + processing",
          buttonLabel: "Begin Self-Enrollment",
          demoLink: "https://livewire-ui-921315025173.us-central1.run.app/",
        };
        break;
      }

      case "OFFER_WALKTHROUGH":
        if (/yes/i.test(message)) {
          text = "Here is the Gemini Live Flow of the mobile app.";
          nextFlowState = "SHOW_WALKTHROUGH_LOW";
          uiCard = {
            type: "AppWalkthroughCard",
            title: "Genius App Demo",
            description: "See how to take payments.",
            link: "https://globalpaydemo.geniusapp.live/",
            primaryButton: "Start Demo",
            secondaryButton: "Back to Plan",
          };
        } else {
          text = "No problem. Here is the plan again.";
          nextFlowState = "PLAN_SELECTION_LOW";
          uiCard = {
            type: "EssentialsPlanCard",
            planName: "Essentials",
            primaryButton: "Add to Cart",
            secondaryButton: "Learn More",
            recommended: true,
          };
        }
        break;

      case "SHOW_WALKTHROUGH_LOW":
        if (/back/i.test(message)) {
          text = "Here’s your Essentials Plan again.";
          nextFlowState = "PLAN_SELECTION_LOW";
          uiCard = {
            type: "EssentialsPlanCard",
            planName: "Essentials",
            primaryButton: "Add to Cart",
            secondaryButton: "Learn More",
            recommended: true,
          };
        }
        break;

      case "SUMMARY_LOW":
        if (/begin|enroll/i.test(message)) {
          // 👈 Checks if message has "begin" or "enroll"
          text =
            "Perfect! Please verify your details to finalize the enrollment.";
          nextFlowState = "FINAL_SUBMISSION";

          // ✅ IT SENDS THIS CARD
          uiCard = {
            type: "ContactFormCard",
            title: "Secure Enrollment",
            prefilledName: sessionData.businessName, // Dynamic Name
            prefilledEmail: "user@example.com",
            prefilledPhone: "+1 (555) 000-0000",
            buttonText: "Complete Enrollment",
          };
        } else {
          text = "Redirecting...";
          nextFlowState = "END";
        }
        break;

      case "FINAL_SUBMISSION":
        text =
          "🎉 Congratulations! Your enrollment is complete. Welcome to Genius!";
        nextFlowState = "END";
        break;
    }

    res.json({
      id: Date.now(),
      sender: "agent",
      text,
      nextFlowState,
      uiCard,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});