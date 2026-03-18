export default function TrustBar() {
  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Stars + reviews */}
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#D4A843" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <div className="text-sm text-dark/70">
            <span className="font-bold text-dark">4.9</span> · Over <span className="font-bold text-dark">2,000</span> five star reviews
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Trust badges */}
        <div className="flex items-center gap-6 text-dark/40 text-sm font-semibold">
          <span className="tracking-wide">LICENSED</span>
          <span className="tracking-wide">BONDED</span>
          <span className="tracking-wide">INSURED</span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200" />

        {/* Guarantee */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B8A7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div className="text-sm">
            <span className="font-bold text-dark">100% Satisfaction</span>
            <br />
            <span className="text-dark/60">or your money back</span>
          </div>
        </div>
      </div>
    </section>
  );
}
