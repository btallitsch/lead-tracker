import type { CSSProperties } from "react";

export const inputStyle: CSSProperties = {
  background: "#0F1013",
  border: "1px solid #2E2F36",
  borderRadius: 8,
  color: "#E8E9EF",
  padding: "10px 14px",
  fontSize: 14,
  width: "100%",
  outline: "none",
  fontFamily: "'Barlow', sans-serif",
};

export const labelStyle: CSSProperties = {
  color: "#666",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: 4,
  display: "block",
};

export const fieldStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

export function btnStyle(bg: string, color: string): CSSProperties {
  return {
    background: bg,
    border: "1px solid #2E2F36",
    color,
    borderRadius: 6,
    padding: "5px 12px",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 500,
  };
}

export const primaryBtnStyle: CSSProperties = {
  background: "linear-gradient(135deg, #FF4D1C, #F5A623)",
  border: "none",
  color: "#fff",
  borderRadius: 8,
  padding: "10px 24px",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 700,
  fontFamily: "'Barlow Condensed', sans-serif",
  letterSpacing: "0.06em",
};
