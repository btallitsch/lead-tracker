import { useState } from "react";
import type { Lead } from "../types";
import { LEAD_STATUS, CAR_CATEGORIES } from "../data/constants";
import { inputStyle, labelStyle, fieldStyle, primaryBtnStyle } from "../utils/styles";

type LeadFormData = Omit<Lead, "id" | "interactions" | "createdAt">;

interface Props {
  initial?: Lead;
  onSave: (data: LeadFormData) => void;
  onClose: () => void;
}

const blank: LeadFormData = {
  name: "",
  phone: "",
  email: "",
  status: "Warm",
  carPreference: "SUV",
  budget: "",
  notes: "",
  nextFollowUp: "",
};

export function LeadForm({ initial, onSave, onClose }: Props) {
  const [form, setForm] = useState<LeadFormData>(
    initial
      ? {
          name: initial.name,
          phone: initial.phone,
          email: initial.email,
          status: initial.status,
          carPreference: initial.carPreference,
          budget: initial.budget,
          notes: initial.notes,
          nextFollowUp: initial.nextFollowUp
            ? new Date(initial.nextFollowUp).toISOString().slice(0, 16)
            : "",
        }
      : blank
  );

  const set = <K extends keyof LeadFormData>(k: K, v: LeadFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({
      ...form,
      nextFollowUp: form.nextFollowUp ? new Date(form.nextFollowUp).toISOString() : "",
    });
  };

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}
      >
        <h2
          style={{
            color: "#E8E9EF",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.04em",
            margin: 0,
          }}
        >
          {initial ? "EDIT LEAD" : "NEW LEAD"}
        </h2>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 20 }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: "grid", gap: 16 }}>
        {/* Name */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Full Name *</label>
          <input
            style={inputStyle}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. John Smith"
          />
        </div>

        {/* Phone + Email */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Phone</label>
            <input
              style={inputStyle}
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="555-000-0000"
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="email@example.com"
            />
          </div>
        </div>

        {/* Status + Car + Budget */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Status</label>
            <select
              style={inputStyle}
              value={form.status}
              onChange={(e) => set("status", e.target.value as Lead["status"])}
            >
              {LEAD_STATUS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Car Interest</label>
            <select
              style={inputStyle}
              value={form.carPreference}
              onChange={(e) => set("carPreference", e.target.value as Lead["carPreference"])}
            >
              {CAR_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Budget ($)</label>
            <input
              style={inputStyle}
              value={form.budget}
              onChange={(e) => set("budget", e.target.value)}
              placeholder="45000"
            />
          </div>
        </div>

        {/* Follow-up */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Next Follow-Up</label>
          <input
            type="datetime-local"
            style={inputStyle}
            value={form.nextFollowUp}
            onChange={(e) => set("nextFollowUp", e.target.value)}
          />
        </div>

        {/* Notes */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Notes</label>
          <textarea
            style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Add context, preferences, objections..."
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 8 }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "1px solid #2E2F36",
              color: "#888",
              borderRadius: 8,
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            Cancel
          </button>
          <button onClick={handleSave} style={primaryBtnStyle}>
            {initial ? "SAVE CHANGES" : "ADD LEAD"}
          </button>
        </div>
      </div>
    </div>
  );
}
