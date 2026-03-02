import type { Lead } from "../types";
import { STATUS_META } from "../data/constants";
import { isOverdue } from "../utils/dateUtils";
import { btnStyle } from "../utils/styles";
import { StatusBadge } from "./StatusBadge";
import { ReminderChip } from "./ReminderChip";

interface Props {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onViewLog: (lead: Lead) => void;
}

export function LeadCard({ lead, onEdit, onDelete, onViewLog }: Props) {
  const meta = STATUS_META[lead.status];
  const overdue = isOverdue(lead.nextFollowUp);

  return (
    <div
      style={{
        background: "#17181C",
        border: `1px solid ${overdue ? "#FF4D1C40" : "#2E2F36"}`,
        borderTop: `3px solid ${meta.color}`,
        borderRadius: 12,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: overdue ? "0 0 20px rgba(255,77,28,0.1)" : "none",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div
            style={{
              color: "#E8E9EF",
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            {lead.name}
          </div>
          <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>
            {lead.phone || lead.email || "No contact info"}
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Tag>🚗 {lead.carPreference}</Tag>
        {lead.budget && <Tag>💰 ${Number(lead.budget).toLocaleString()}</Tag>}
        <Tag>
          💬 {lead.interactions.length} contact{lead.interactions.length !== 1 ? "s" : ""}
        </Tag>
      </div>

      {/* Notes */}
      {lead.notes && (
        <p
          style={{
            color: "#666",
            fontSize: 13,
            margin: 0,
            lineHeight: 1.5,
            borderLeft: "2px solid #2E2F36",
            paddingLeft: 10,
          }}
        >
          {lead.notes.length > 100 ? lead.notes.slice(0, 100) + "…" : lead.notes}
        </p>
      )}

      {/* Reminder */}
      {lead.nextFollowUp && <ReminderChip iso={lead.nextFollowUp} />}

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginTop: 2,
          borderTop: "1px solid #2E2F3640",
          paddingTop: 12,
        }}
      >
        <button onClick={() => onViewLog(lead)} style={btnStyle("#1A1B20", "#555")}>
          📋 Log
        </button>
        <button onClick={() => onEdit(lead)} style={btnStyle("#1A1B20", "#555")}>
          ✏️ Edit
        </button>
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => {
              if (window.confirm(`Delete lead "${lead.name}"?`)) onDelete(lead.id);
            }}
            style={btnStyle("#1A1B20", "#FF4D1C88")}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "#1F2028",
        color: "#8892A4",
        border: "1px solid #2E2F36",
        borderRadius: 6,
        padding: "2px 8px",
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}
