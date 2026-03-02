import { useState } from "react";
import type { Lead, Interaction, InteractionType } from "../types";
import { INTERACTION_TYPES, INTERACTION_COLORS } from "../data/constants";
import { generateId, formatDateTime } from "../utils/dateUtils";

interface Props {
  lead: Lead;
  onAdd: (interaction: Interaction) => void;
  onClose: () => void;
}

interface LogForm {
  type: InteractionType;
  note: string;
  date: string;
}

const inputStyle = {
  background: "#0F1013",
  border: "1px solid #2E2F36",
  borderRadius: 8,
  color: "#E8E9EF",
  padding: "8px 12px",
  fontSize: 13,
  fontFamily: "'Barlow', sans-serif",
  outline: "none",
} as const;

export function InteractionLog({ lead, onAdd, onClose }: Props) {
  const [form, setForm] = useState<LogForm>({
    type: "Call",
    note: "",
    date: new Date().toISOString().slice(0, 16),
  });

  const set = <K extends keyof LogForm>(k: K, v: LogForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleAdd = () => {
    if (!form.note.trim()) return;
    onAdd({
      id: generateId(),
      type: form.type,
      date: new Date(form.date).toISOString(),
      note: form.note,
    });
    setForm({ type: "Call", note: "", date: new Date().toISOString().slice(0, 16) });
  };

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}
      >
        <div>
          <h2
            style={{
              color: "#E8E9EF",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              margin: 0,
            }}
          >
            INTERACTIONS
          </h2>
          <p style={{ color: "#666", fontSize: 12, margin: "2px 0 0" }}>{lead.name}</p>
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 20 }}
        >
          ✕
        </button>
      </div>

      {/* Add new interaction */}
      <div
        style={{
          background: "#0F1013",
          border: "1px solid #2E2F36",
          borderRadius: 10,
          padding: 14,
          marginBottom: 20,
        }}
      >
        <p
          style={{
            color: "#888",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 10px",
          }}
        >
          Log Interaction
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
          <select
            style={inputStyle}
            value={form.type}
            onChange={(e) => set("type", e.target.value as InteractionType)}
          >
            {INTERACTION_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <input
            type="datetime-local"
            style={inputStyle}
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </div>
        <input
          style={{ ...inputStyle, width: "100%", marginBottom: 8, boxSizing: "border-box" }}
          placeholder="Notes from this interaction..."
          value={form.note}
          onChange={(e) => set("note", e.target.value)}
        />
        <button
          onClick={handleAdd}
          style={{
            background: "linear-gradient(135deg, #FF4D1C, #F5A623)",
            border: "none",
            color: "#fff",
            borderRadius: 6,
            padding: "8px 18px",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: "0.06em",
          }}
        >
          + LOG IT
        </button>
      </div>

      {/* History */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {lead.interactions.length === 0 && (
          <p style={{ color: "#444", textAlign: "center", padding: 20, fontSize: 13 }}>
            No interactions logged yet.
          </p>
        )}
        {[...lead.interactions].reverse().map((i) => {
          const color = INTERACTION_COLORS[i.type] ?? "#888";
          return (
            <div
              key={i.id}
              style={{
                background: "#1A1B20",
                border: "1px solid #2E2F36",
                borderRadius: 8,
                padding: 12,
                display: "flex",
                gap: 12,
              }}
            >
              <div
                style={{ width: 3, borderRadius: 99, background: color, flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}
                >
                  <span
                    style={{
                      color,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {i.type}
                  </span>
                  <span style={{ color: "#444", fontSize: 11 }}>{formatDateTime(i.date)}</span>
                </div>
                <p style={{ color: "#C8C9CF", fontSize: 13, margin: 0, lineHeight: 1.4 }}>
                  {i.note}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
