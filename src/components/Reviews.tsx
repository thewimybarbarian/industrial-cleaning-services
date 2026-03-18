const reviews = [
  {
    name: "John Cope",
    text: "They do an amazing job on our home every time it gets cleaned! We've been customers for almost 5 years and wouldn't recommend anyone else. Wonderful team and service!",
    rating: 5,
  },
  {
    name: "Guillermo Alvarado M.",
    text: "Best in the business hands down. Nothing but the best quality in their service! If you're looking for a better service you're not going to find one. Highly recommended for your home or business.",
    rating: 5,
  },
  {
    name: "Supriya Adams",
    text: "Awesome service! Have been using them for a long time. Very thorough and completely trustworthy. Can not think of a better company. 100% recommend.",
    rating: 5,
  },
  {
    name: "Karen Mundee",
    text: "Great job. Good time management, and the result is always the same great! Thank you.",
    rating: 5,
  },
  {
    name: "Fonda Lemons Nixon",
    text: "Best cleaning service! Started using last September and love them.",
    rating: 5,
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

export default function Reviews() {
  return (
    <section className="py-20 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
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
          ))}
        </div>

        {/* Facebook badge */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 text-sm text-dark/50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Reviews sourced from our Facebook page</span>
          </div>
        </div>
      </div>
    </section>
  );
}
