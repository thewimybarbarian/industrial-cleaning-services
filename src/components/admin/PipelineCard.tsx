"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import type { BookingRow } from "@/lib/types";

const frequencyLabels: Record<string, string> = {
  once: "One-time",
  weekly: "Weekly",
  biweekly: "Bi-weekly",
  monthly: "Monthly",
};

export default function PipelineCard({ booking }: { booking: BookingRow }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: booking.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <p className="font-semibold text-dark text-sm">{booking.customers?.name}</p>
        <span className="text-green font-bold text-sm">${booking.price}</span>
      </div>
      <p className="text-xs text-text-muted mb-1">
        {booking.scheduled_date} at {booking.scheduled_time}
      </p>
      <p className="text-xs text-text-muted mb-3">
        {booking.bedrooms} bed / {booking.bathrooms} bath &middot; {frequencyLabels[booking.frequency] || booking.frequency}
      </p>
      <Link
        href={`/admin/bookings/${booking.id}`}
        className="text-xs text-green hover:underline"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        View details &rarr;
      </Link>
    </div>
  );
}
