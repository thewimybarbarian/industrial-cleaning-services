"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface DataPoint {
  week: string;
  revenue: number;
}

export default function RevenueChart({ data }: { data: DataPoint[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3
        className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4"
      >
        Revenue (Last 12 Weeks)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0DCD8" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12, fill: "#8A8580" }}
              axisLine={{ stroke: "#E0DCD8" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#8A8580" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Revenue"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E0DCD8",
                fontSize: "13px",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#5B8A7A"
              strokeWidth={2.5}
              dot={{ fill: "#5B8A7A", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
