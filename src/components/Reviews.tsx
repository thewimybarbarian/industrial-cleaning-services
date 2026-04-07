const reviews = [
  {
    name: "John Cope",
    text: "They do an amazing job on our home every time it gets cleaned! We've been customers for almost 5 years and wouldn't recommend anyone else. Wonderful team and service!",
  },
  {
    name: "Guillermo Alvarado M.",
    text: "Best in the business hands down. Nothing but the best quality in their service! If you're looking for a better service you're not going to find one. Highly recommended for your home or business.",
  },
  {
    name: "Supriya Adams",
    text: "Awesome service! Have been using them for a long time. Very thorough and completely trustworthy. Can not think of a better company. 100% recommend.",
  },
  {
    name: "Karen Mundee",
    text: "Great job. Good time management, and the result is always the same great! Thank you.",
  },
  {
    name: "Fonda Lemons Nixon",
    text: "Best cleaning service! Started using last September and love them.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#D4A843">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Initials({ name }: { name: string }) {
  const parts = name.split(" ");
  const initials = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
  return (
    <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center text-green font-bold text-sm shrink-0">
      {initials}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="w-[340px] md:w-[380px] shrink-0 bg-white rounded-2xl p-6 shadow-sm">
      <Stars />
      <p className="text-dark/70 text-sm leading-relaxed mt-4 mb-5">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <Initials name={review.name} />
        <div>
          <p className="font-bold text-dark text-sm">{review.name}</p>
          <p className="text-xs text-dark/40">Verified Customer</p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  // Double the reviews for seamless loop
  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-20 bg-gray-light overflow-hidden relative">
      <div className="absolute inset-0 pattern-dots pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <img
            src="/powered-2.png"
            alt="Powered by Avexis"
            className="mx-auto mb-6 h-12 md:h-14 w-auto"
          />
          <span className="inline-block text-green text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Real Reviews
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-dark mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            What our customers say
          </h2>
          <p className="text-dark/60 max-w-md mx-auto">
            Don&apos;t take our word for it &mdash; hear from the families and businesses we serve.
          </p>
        </div>
      </div>

      {/* Marquee container */}
      <div className="relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-light to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-light to-transparent z-10 pointer-events-none" />

        {/* Scrolling strip */}
        <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {doubled.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Facebook badge */}
      <div className="text-center mt-10">
        <a
          href="https://www.facebook.com/profile.php?id=100091490116431"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-dark/50 hover:text-dark/70 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Reviews sourced from our Facebook page</span>
        </a>
      </div>
    </section>
  );
}
