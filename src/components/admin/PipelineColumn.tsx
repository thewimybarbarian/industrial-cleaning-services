"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import PipelineCard from "./PipelineCard";
import type { BookingRow } from "@/lib/types";

const columnColors: Record<string, string> = {
  pending: "border-gold",
  confirmed: "border-green",
  completed: "border-dark",
  cancelled: "border-terracotta",
};

const headerColors: Record<string, string> = {
  pending: "text-gold",
  confirmed: "text-green",
  completed: "text-dark",
  cancelled: "text-terracotta",
};

export default function PipelineColumn({
  status,
  bookings,
}: {
  status: string;
  bookings: BookingRow[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={`md:flex-1 md:min-w-[260px] rounded-xl border-t-4 ${columnColors[status] || "border-gray-300"} bg-gray-light/50 ${
        isOver ? "bg-green/5" : ""
      } transition-colors`}
    >
      <div className="p-4 pb-2 flex items-center justify-between">
        <h3
          className={`text-sm font-bold uppercase tracking-wide ${headerColors[status] || "text-dark"}`}
        >
          {status}
        </h3>
        <span className="text-xs text-text-muted bg-white rounded-full px-2 py-0.5">
          {bookings.length}
        </span>
      </div>
      <SortableContext
        items={bookings.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="p-3 pt-1 space-y-3 md:min-h-[200px]">
          {bookings.map((booking) => (
            <PipelineCard key={booking.id} booking={booking} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
