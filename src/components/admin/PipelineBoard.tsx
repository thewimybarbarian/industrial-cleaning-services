"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import PipelineColumn from "./PipelineColumn";
import PipelineCard from "./PipelineCard";
import type { BookingRow } from "@/lib/types";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export default function PipelineBoard({
  initialBookings,
}: {
  initialBookings: BookingRow[];
}) {
  const [bookings, setBookings] = useState(initialBookings);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activeBooking = activeId
    ? bookings.find((b) => b.id === activeId)
    : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const bookingId = active.id as string;
    let newStatus = over.id as string;

    // If dropped on a card, find which column that card belongs to
    if (!STATUSES.includes(newStatus)) {
      const targetBooking = bookings.find((b) => b.id === newStatus);
      if (targetBooking) newStatus = targetBooking.status;
    }

    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking || booking.status === newStatus) return;

    // Optimistic update
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: newStatus as BookingRow["status"] } : b
      )
    );

    // Persist
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      // Revert on failure
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: booking.status } : b
        )
      );
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col md:flex-row gap-4 md:overflow-x-auto pb-4">
        {STATUSES.map((status) => (
          <PipelineColumn
            key={status}
            status={status}
            bookings={bookings.filter((b) => b.status === status)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeBooking ? <PipelineCard booking={activeBooking} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
