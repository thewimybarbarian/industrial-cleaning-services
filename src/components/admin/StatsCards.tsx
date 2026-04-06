interface StatCard {
  label: string;
  value: string | number;
  sub?: string;
}

export default function StatsCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-text-muted text-xs font-medium uppercase tracking-wide">{stat.label}</p>
          <p className="text-2xl font-bold text-dark mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
            {stat.value}
          </p>
          {stat.sub && <p className="text-text-muted text-xs mt-1">{stat.sub}</p>}
        </div>
      ))}
    </div>
  );
}
