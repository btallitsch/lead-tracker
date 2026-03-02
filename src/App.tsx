import { useState, useEffect } from "react";
import type { Lead, LeadStatus, CarCategory, SortOption } from "./types";
import { LEAD_STATUS } from "./data/constants";
import { useLeads } from "./hooks/useLeads";
import { Modal } from "./components/Modal";
import { LeadCard } from "./components/LeadCard";
import { LeadForm } from "./components/LeadForm";
import { InteractionLog } from "./components/InteractionLog";
import { StatsBar } from "./components/StatsBar";
import { FilterBar } from "./components/FilterBar";

type ModalState =
  | { type: "add" }
  | { type: "edit"; lead: Lead }
  | { type: "log"; lead: Lead }
  | null;

export default function App() {
  const { leads, addLead, editLead, deleteLead, addInteraction } = useLeads();
  const [modal, setModal] = useState<ModalState>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "All">("All");
  const [filterCar, setFilterCar] = useState<CarCategory | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("followup");

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  // Filter + sort
  const filtered = leads
    .filter((l) => {
      const q = search.toLowerCase();
      if (
        q &&
        !l.name.toLowerCase().includes(q) &&
        !l.phone.includes(q) &&
        !l.email.toLowerCase().includes(q) &&
        !l.notes.toLowerCase().includes(q)
      )
        return false;
      if (filterStatus !== "All" && l.status !== filterStatus) return false;
      if (filterCar !== "All" && l.carPreference !== filterCar) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "followup") {
        if (!a.nextFollowUp) return 1;
        if (!b.nextFollowUp) return -1;
        return new Date(a.nextFollowUp).getTime() - new Date(b.nextFollowUp).getTime();
      }
      if (sortBy === "status")
        return LEAD_STATUS.indexOf(a.status) - LEAD_STATUS.indexOf(b.status);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const currentLogLead =
    modal?.type === "log" ? leads.find((l) => l.id === modal.lead.id) ?? modal.lead : null;

  return (
    <div
      style={{ minHeight: "100vh", background: "#0F1013", color: "#E8E9EF", fontFamily: "'Barlow', sans-serif" }}
    >
      {/* Noise texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.025,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 60px" }}>
        {/* Header */}
        <div style={{ padding: "32px 0 24px", borderBottom: "1px solid #1E1F24" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 28 }}>🏎️</span>
                <h1
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 32,
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    margin: 0,
                    background: "linear-gradient(90deg, #FF4D1C, #F5A623)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  LEAD TRACKER
                </h1>
              </div>
              <p style={{ color: "#444", fontSize: 13, margin: 0 }}>
                Your personal sales pipeline · {leads.length} total leads
              </p>
            </div>
            <button
              onClick={() => setModal({ type: "add" })}
              style={{
                background: "linear-gradient(135deg, #FF4D1C, #F5A623)",
                border: "none",
                color: "#fff",
                borderRadius: 10,
                padding: "12px 24px",
                cursor: "pointer",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.08em",
                boxShadow: "0 4px 20px rgba(255,77,28,0.3)",
              }}
            >
              + NEW LEAD
            </button>
          </div>
        </div>

        {/* Stats */}
        <StatsBar leads={leads} />

        {/* Filters */}
        <FilterBar
          search={search}
          onSearch={setSearch}
          filterStatus={filterStatus}
          onFilterStatus={setFilterStatus}
          filterCar={filterCar}
          onFilterCar={setFilterCar}
          sortBy={sortBy}
          onSortBy={setSortBy}
        />

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚗</div>
            <p
              style={{
                fontSize: 16,
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              NO LEADS FOUND
            </p>
            <p style={{ fontSize: 13 }}>Try adjusting your filters or add a new lead.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 14,
            }}
          >
            {filtered.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEdit={(l) => setModal({ type: "edit", lead: l })}
                onDelete={deleteLead}
                onViewLog={(l) => setModal({ type: "log", lead: l })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal open={modal?.type === "add"} onClose={() => setModal(null)}>
        <LeadForm onSave={(data) => { addLead(data); setModal(null); }} onClose={() => setModal(null)} />
      </Modal>

      <Modal open={modal?.type === "edit"} onClose={() => setModal(null)}>
        {modal?.type === "edit" && (
          <LeadForm
            initial={modal.lead}
            onSave={(data) => { editLead({ ...modal.lead, ...data }); setModal(null); }}
            onClose={() => setModal(null)}
          />
        )}
      </Modal>

      <Modal open={modal?.type === "log"} onClose={() => setModal(null)}>
        {currentLogLead && (
          <InteractionLog
            lead={currentLogLead}
            onAdd={(interaction) => {
              addInteraction(currentLogLead.id, interaction);
            }}
            onClose={() => setModal(null)}
          />
        )}
      </Modal>
    </div>
  );
}
