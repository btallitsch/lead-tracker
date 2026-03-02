import { useState } from "react";
import type { Lead, Interaction } from "../types";
import { SEED_LEADS } from "../data/seedLeads";
import { generateId } from "../utils/dateUtils";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(SEED_LEADS);

  const addLead = (data: Omit<Lead, "id" | "interactions" | "createdAt">) => {
    const newLead: Lead = {
      ...data,
      id: generateId(),
      interactions: [],
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const editLead = (data: Lead) => {
    setLeads((prev) => prev.map((l) => (l.id === data.id ? { ...l, ...data } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const addInteraction = (leadId: string, interaction: Interaction) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, interactions: [...l.interactions, interaction] }
          : l
      )
    );
  };

  return { leads, addLead, editLead, deleteLead, addInteraction };
}
