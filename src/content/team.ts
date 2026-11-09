// TODO: Fill in each person's role, bio, photo and links below.
// - photo: put the file in public/images/ and write e.g. "/images/harmain.jpg". Leave "" to show initials.
// - linkedin / github: paste full links, or leave "" to hide the icon.
export type Person = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin: string;
  github: string;
};

export const team: Person[] = [
  {
    name: "Muhammad Harmain",
    role: "CO-Founder",
    bio: "Team Lead And Software Developer\nBuilt the working system: the admin and driver consoles, the three agents and the automatic alert flow. Turns the project's design into software that runs end to end.",
    photo: "/images/harmain.jpg",
    linkedin: "https://www.linkedin.com/in/muhammad-harmain-b6b335221/",
    github: "https://github.com/Mharmain/",
  },
  {
    name: "Ahmed Arif",
    role: "CO-Founder",
    bio: "Documentation & System Architecture\nDesigned how the parts of Ignis RescueLink fit together (The Architecture) and documented the system and its decisions. His work keeps the project clear, organized and easy to explain.",
    photo: "/images/ahmed.png",
    linkedin: "https://www.linkedin.com/in/aa-ahmed-arif/",
    github: "https://github.com/aa-ahmed-arif",
  },
  {
    name: "Royam Ali Khan",
    role: "CO-Founder",
    bio: "Testing & Cloud Deployment\nTests the system to check that alerts, routes and consoles behave as expected, and handles putting the project online in the cloud. His work helps keep Ignis RescueLink dependable.",
    photo: "/images/royam.jpg",
    linkedin: "https://www.linkedin.com/in/royam-ali-khan-695276356/",
    github: "https://github.com/rakhxn-droid",
  },
];

export const supervisor: Person = {
  name: "Dr. M. Farrukh Shahid",
  role: "Faculty Supervisor",
  bio: "Guides research methodology and validates the technical approach behind Ignis-RescueLink",
  photo: "/images/Sir.jpg",
  linkedin: "https://www.linkedin.com/in/muhammad-farrukh-syed-2599b618/",
  github: "",
};

export const teamPage = {
  title: "The team behind Ignis RescueLink",
  subtitle:
    "Computer science students at FAST NUCES Karachi, building technology for faster emergency response.",
  aboutTitle: "About this project",
  aboutText:
    "Ignis RescueLink is our Final Year Project for the BS in Computer Science at FAST NUCES Karachi.",
};
