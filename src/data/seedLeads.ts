import type { Lead } from "../types";

export const SEED_LEADS: Lead[] = [
  {
    id: "lead1",
    name: "Marcus Webb",
    phone: "555-210-3847",
    email: "marcus.webb@email.com",
    status: "Hot",
    carPreference: "SUV",
    budget: "45000",
    notes: "Very interested in the Expedition. Has a trade-in 2019 Civic.",
    nextFollowUp: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
    interactions: [
      {
        id: "i1",
        type: "Visit",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        note: "Took Explorer for test drive. Wants sunroof.",
      },
      {
        id: "i2",
        type: "Call",
        date: new Date(Date.now() - 86400000).toISOString(),
        note: "Discussed financing options. Rate at 5.9% works.",
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "lead2",
    name: "Sofia Delgado",
    phone: "555-987-1234",
    email: "sofiad@gmail.com",
    status: "Warm",
    carPreference: "EV",
    budget: "55000",
    notes: "Comparing Tesla Model Y and our EV lineup. Price-sensitive.",
    nextFollowUp: new Date(Date.now() + 86400000 * 3).toISOString(),
    interactions: [
      {
        id: "i3",
        type: "Email",
        date: new Date(Date.now() - 86400000 * 4).toISOString(),
        note: "Sent EV comparison brochure.",
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    id: "lead3",
    name: "Derek Holt",
    phone: "555-332-7890",
    email: "",
    status: "Cold",
    carPreference: "Truck",
    budget: "38000",
    notes: "Was browsing. Didn't seem ready to commit.",
    nextFollowUp: new Date(Date.now() - 86400000).toISOString(),
    interactions: [],
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
];
