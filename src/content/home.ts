// All Home page text lives here. Edit freely.
export const home = {
  hero: {
    eyebrow: "Final Year Project · FAST NUCES Karachi",
    title: "From the fire alarm to the building, one screen.",
    subtitle:
      "Ignis RescueLink automatically alerts the nearest ambulances, plans the fastest route and guides the driver hands-free, so help can reach a fire sooner.",
    primary: { label: "Request a Demo", href: "/contact?reason=demo" },
    secondary: { label: "See the Solution", href: "/solution" },
  },
  problem: {
    eyebrow: "The problem",
    title: "Between the alarm and the ambulance, minutes slip away.",
    cards: [
      { icon: "phone", title: "Alerts wait on phone calls", text: "Someone has to report the fire and pass the message on. Every hand-off adds time." },
      { icon: "search", title: "Finding a free ambulance", text: "Working out which ambulance is available and closest often means more calls and radio messages." },
      { icon: "route", title: "Drivers look for the way", text: "The driver heads to the scene without one screen that shows the fire location and the best route." },
    ],
    closing: "Every hand-off costs precious minutes.",
  },
  why: {
    eyebrow: "Why we built it",
    title: "We start where the alarm ends.",
    paragraphs: [
      "Karachi is Pakistan's largest city. In a city this big and this busy, distance and traffic quietly eat into every emergency response.",
      "As computer science students, we asked a simple question: once a fire alarm goes off, what happens next? Modern buildings can detect a fire with cameras and smoke sensors, but getting the right ambulance moving along the best route still depends on people passing messages from one to another.",
      "Ignis RescueLink starts exactly where detection ends. It receives the alarm, finds the nearest available ambulances in that part of the city, plans the fastest route and speaks with the driver, without a phone call in between.",
    ],
    timelineTitle: "How the idea took shape",
    timeline: [
      { title: "The question", text: "What happens after the alarm?" },
      { title: "The idea", text: "Connect the alarm to the ambulance automatically." },
      { title: "The design", text: "Three agents: Dispatch, Routing and Voice." },
      { title: "The build", text: "Two consoles, one for admins and one for drivers, working together on one live map of Karachi." },
    ],
  },
  video: {
    eyebrow: "See it in action",
    title: "The whole workflow in two and a half minutes",
    subtitle: "From the fire alarm to the ambulance reaching the building.",
    fallbackTitle: "Video coming soon",
    fallbackText: "The walkthrough video will appear here.",
  },
  who: {
    title: "Built for the people on both ends of the alarm.",
    cards: [
      { icon: "driver", title: "Ambulance drivers", text: "A clear alert, one tap to acknowledge, the route on the map and a voice assistant that keeps both hands on the wheel." },
      { icon: "admin", title: "Control room admins", text: "One live map of the city, every decision explained, and a complete history of every alert." },
      { icon: "people", title: "People in the building", text: "Help that is alerted automatically and routed to reach the scene sooner." },
    ],
  },
  cta: {
    title: "Want to see Ignis RescueLink in action?",
    text: "Request a demo, or ask us anything about the project.",
    button: { label: "Contact us", href: "/contact" },
  },
};
