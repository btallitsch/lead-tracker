import type { CarCategory, InteractionType, LeadStatus, StatusMeta } from "../types";

export const LEAD_STATUS: LeadStatus[] = ["Hot", "Warm", "Cold"];

export const STATUS_META: Record<LeadStatus, StatusMeta> = {
  Hot:  { color: "#FF4D1C", glow: "rgba(255,77,28,0.35)",  icon: "🔥" },
  Warm: { color: "#F5A623", glow: "rgba(245,166,35,0.35)", icon: "⚡" },
  Cold: { color: "#4A90D9", glow: "rgba(74,144,217,0.35)", icon: "❄️" },
};

export const CAR_CATEGORIES: CarCategory[] = [
  "Sedan", "SUV", "Truck", "Sports", "Luxury", "EV", "Van", "Convertible",
];

export const INTERACTION_TYPES: InteractionType[] = [
  "Call", "Email", "Visit", "Text", "Demo Drive",
];

export const INTERACTION_COLORS: Record<InteractionType, string> = {
  Call: "#4A90D9",
  Email: "#F5A623",
  Visit: "#7ED321",
  Text: "#9B59B6",
  "Demo Drive": "#FF4D1C",
};
