// All Solution page text lives here. Edit freely.
export const solution = {
  hero: {
    eyebrow: "The solution",
    title: "One alarm. Three agents. One screen.",
    subtitle: "Ignis RescueLink connects every step between a confirmed fire alarm and an ambulance arriving at the scene.",
  },
  how: {
    title: "How it works",
    steps: [
      { title: "Alarm confirmed", text: "A building's fire detection system, with its cameras and smoke sensors, confirms a fire and sends the alert to Ignis automatically." },
      { title: "Nearest ambulances found", text: "The Dispatch Agent picks the nearest available ambulances in that part of the city." },
      { title: "Driver alerted", text: "The driver gets an alert with a sound, showing the fire location and how many ambulances are needed." },
      { title: "One tap to acknowledge", text: "The first drivers to acknowledge are on their way. If too few respond, the next nearest ambulance is alerted automatically." },
      { title: "Fastest route", text: "The Routing Agent plans a traffic-aware route and shows the least congested path." },
      { title: "Hands-free guidance", text: "The Voice Agent talks with the driver, so both hands stay on the wheel." },
      { title: "Arrival and record", text: "Arrival is confirmed automatically and the alert is saved to the history with its result." },
    ],
  },
  agents: {
    title: "Three agents, one goal",
    items: [
      { icon: "dispatch", name: "Dispatch Agent", tag: "", text: "Chooses which ambulances to alert. It looks for the nearest available ones in the fire's region first, alerts more if too few respond, and explains every decision in plain language." },
      { icon: "route", name: "Routing Agent", tag: "", text: "Plans the fastest route from the ambulance to the fire site, compares alternatives and avoids congested roads where it can." },
      { icon: "voice", name: "Voice Agent", tag: "Driver only", text: "Talks with the driver hands-free. The driver can ask how far the fire site is or which floor is burning, without touching the screen." },
    ],
  },
  consoles: {
    title: "Two consoles, always in sync",
    subtitle: "Both consoles follow the same trip at the same time.",
    admin: {
      title: "Admin console",
      image: "control-room",
      bullets: [
        "One live map of Karachi, split into four regions",
        "Every ambulance coloured by status: active, en route or inactive",
        "A red alert the moment a fire is detected",
        "See who was notified and every decision the agents made",
        "Manage the fleet and assign ambulances to drivers",
        "A complete history of every alert, with its result",
      ],
    },
    driver: {
      title: "Driver console",
      image: "driver-cabin",
      bullets: [
        "An alert with a sound, showing where and how many ambulances are needed",
        "One tap to acknowledge",
        "The fastest route on the map",
        "A hands-free voice assistant",
        "Only the driver's own ambulance and trip are shown",
      ],
    },
  },
  access: {
    title: "Safe and controlled access",
    items: [
      { icon: "mail", title: "Verified sign-in", text: "Every user signs in with a verified email and a 6-digit code." },
      { icon: "eye", title: "Drivers see only their own", text: "A driver only sees the ambulances assigned to him." },
      { icon: "lock", title: "Protected admin role", text: "Admin accounts need a secret code." },
    ],
  },
  benefits: {
    title: "What changes with Ignis RescueLink",
    items: [
      { icon: "bell", title: "Automatic alerts", text: "A confirmed alarm reaches Ignis without a phone call." },
      { icon: "pin", title: "The nearest ambulance", text: "Nearest available ambulances in the fire's region are alerted first." },
      { icon: "route", title: "The fastest route", text: "A traffic-aware route that avoids congested roads where it can." },
      { icon: "voice", title: "Hands-free guidance", text: "The driver talks with the Voice Agent, hands on the wheel." },
      { icon: "eye", title: "Full visibility", text: "Admins see every ambulance and every agent decision on one map." },
      { icon: "history", title: "A complete history", text: "Every alert is saved with its result: success, partial or cancelled." },
    ],
  },
};
