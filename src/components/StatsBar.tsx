import type { Lead } from "../types";
import { STATUS_META } from "../data/constants";
import { isOverdue } from "../utils/dateUtils";

interface Props {
  leads: Lead[];
}

export function StatsBar({ leads }: Props) {
  const hot = leads.filter((l) => l.status === "Hot").length;
  const warm = leads.filter((l) => l.status === "Warm").length;
  const cold = leads.filter((l) => l.status === "Cold").length;
  const overdueCount = leads.filter((l) => isOverdue(l.nextFollowUp)).length;

  const stats = [
    { label: "Hot Leads",   value: hot,          color: STATUS_META.Hot.color,  icon: "🔥" },
    { label: "Warm Leads",  value: warm,         color: STATUS_META.Warm.color, icon: "⚡" },
    { label: "Cold Leads",  value: cold,         color: STATUS_META.Cold.color, icon: "❄️" },
    { label: "Overdue",     value: overdueCount, color: overdueCount > 0 ? "#FF4D1C" : "#3A3B40", icon: "⚠️" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
        padding: "20px 0",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            background: "#17181C",
            border: `1px solid ${s.color}30`,
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              color: s.color,
              fontSize: 22,
              fontWeight: 800,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            {s.icon} {s.value}
          </div>
          <div
            style={{
              color: "#555",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
