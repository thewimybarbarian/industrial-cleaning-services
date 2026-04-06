"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface StatusData {
  status: string;
  count: number;
}

const COLORS: Record<string, string> = {
  pending: "#D4A843",
  confirmed: "#5B8A7A",
  completed: "#2D2D2D",
  cancelled: "#D4734A",
};

export default function StatusChart({ data }: { data: StatusData[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3
        className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4"
      >
        Bookings by Status
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={85}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={COLORS[entry.status] || "#8A8580"}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E0DCD8",
                fontSize: "13px",
              }}
              formatter={(value, name) => [value, String(name).charAt(0).toUpperCase() + String(name).slice(1)]}
            />
            <Legend
              formatter={(value: string) => (
                <span className="text-xs capitalize text-dark/70">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
