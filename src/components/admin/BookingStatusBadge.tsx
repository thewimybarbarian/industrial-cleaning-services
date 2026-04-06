const statusStyles: Record<string, string> = {
  pending: "bg-gold/15 text-gold",
  confirmed: "bg-green/15 text-green",
  completed: "bg-dark/10 text-dark",
  cancelled: "bg-terracotta/15 text-terracotta",
};

export default function BookingStatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
