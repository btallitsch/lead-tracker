import type { LeadStatus, CarCategory, SortOption } from "../types";
import { LEAD_STATUS, CAR_CATEGORIES } from "../data/constants";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  filterStatus: LeadStatus | "All";
  onFilterStatus: (v: LeadStatus | "All") => void;
  filterCar: CarCategory | "All";
  onFilterCar: (v: CarCategory | "All") => void;
  sortBy: SortOption;
  onSortBy: (v: SortOption) => void;
}

const inputStyle = {
  background: "#17181C",
  border: "1px solid #2E2F36",
  borderRadius: 8,
  color: "#E8E9EF",
  padding: "8px 14px",
  fontSize: 13,
  fontFamily: "'Barlow', sans-serif",
  outline: "none",
} as const;

export function FilterBar({
  search, onSearch,
  filterStatus, onFilterStatus,
  filterCar, onFilterCar,
  sortBy, onSortBy,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <input
        style={{ ...inputStyle, flex: 1, minWidth: 180 }}
        placeholder="🔍  Search leads..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        style={inputStyle}
        value={filterStatus}
        onChange={(e) => onFilterStatus(e.target.value as LeadStatus | "All")}
      >
        <option value="All">All Statuses</option>
        {LEAD_STATUS.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <select
        style={inputStyle}
        value={filterCar}
        onChange={(e) => onFilterCar(e.target.value as CarCategory | "All")}
      >
        <option value="All">All Vehicles</option>
        {CAR_CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select
        style={inputStyle}
        value={sortBy}
        onChange={(e) => onSortBy(e.target.value as SortOption)}
      >
        <option value="followup">Sort: Follow-Up</option>
        <option value="status">Sort: Status</option>
        <option value="name">Sort: Name</option>
        <option value="newest">Sort: Newest</option>
      </select>
    </div>
  );
}
