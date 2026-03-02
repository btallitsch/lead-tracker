import { formatDateTime, isOverdue, isDueSoon } from "../utils/dateUtils";

interface Props {
  iso: string;
}

export function ReminderChip({ iso }: Props) {
  if (!iso) return null;
  const overdue = isOverdue(iso);
  const soon = isDueSoon(iso);
  const color = overdue ? "#FF4D1C" : soon ? "#F5A623" : "#888";

  return (
    <span
      style={{
        color,
        fontSize: 11,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {overdue ? "⚠️" : "🕐"}{" "}
      {overdue ? "OVERDUE · " : soon ? "DUE SOON · " : ""}
      {formatDateTime(iso)}
    </span>
  );
}
