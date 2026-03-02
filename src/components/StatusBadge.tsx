import type { LeadStatus } from "../types";
import { STATUS_META } from "../data/constants";

interface Props {
  status: LeadStatus;
}

export function StatusBadge({ status }: Props) {
  const meta = STATUS_META[status];
  return (
    <span
      style={{
        background: `${meta.color}20`,
        color: meta.color,
        border: `1px solid ${meta.color}50`,
        borderRadius: 6,
        padding: "2px 10px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.05em",
        fontFamily: "'Barlow Condensed', sans-serif",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {meta.icon} {status.toUpperCase()}
    </span>
  );
}
