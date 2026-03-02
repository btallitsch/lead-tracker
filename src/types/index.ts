export type LeadStatus = "Hot" | "Warm" | "Cold";

export type CarCategory =
  | "Sedan"
  | "SUV"
  | "Truck"
  | "Sports"
  | "Luxury"
  | "EV"
  | "Van"
  | "Convertible";

export type InteractionType = "Call" | "Email" | "Visit" | "Text" | "Demo Drive";

export type SortOption = "followup" | "status" | "name" | "newest";

export interface Interaction {
  id: string;
  type: InteractionType;
  date: string; // ISO string
  note: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: LeadStatus;
  carPreference: CarCategory;
  budget: string;
  notes: string;
  nextFollowUp: string; // ISO string or ""
  interactions: Interaction[];
  createdAt: string; // ISO string
}

export interface StatusMeta {
  color: string;
  glow: string;
  icon: string;
}
