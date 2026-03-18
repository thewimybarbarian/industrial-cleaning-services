"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, isVisible: boolean, duration = 1800, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration, decimals]);

  return value;
}

export default function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const rating = useCountUp(4.9, isVisible, 1400, 1);
  const reviewCount = useCountUp(2000, isVisible, 2000, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-16 px-6 bg-white overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-green/[0.04] blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Rating card */}
          <div
            className={`group relative bg-gray-light rounded-2xl p-6 md:p-8 text-center transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#D4A843"
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Big number */}
            <div
              className="text-4xl md:text-5xl font-bold text-dark mb-1"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {rating}
            </div>

            <p className="text-dark/60 text-sm">
              Over <span className="font-bold text-dark">{reviewCount.toLocaleString()}+</span> five-star reviews
            </p>

            {/* Decorative accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gold rounded-t-full transition-all duration-500 group-hover:w-24" />
          </div>

          {/* Licensed / Bonded / Insured card */}
          <div
            className={`group relative bg-gray-light rounded-2xl p-6 md:p-8 text-center transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            {/* Shield icon */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div
                  className={`absolute inset-0 w-14 h-14 rounded-xl bg-green/20 transition-all duration-700 ${
                    isVisible ? "animate-pulse-slow" : ""
                  }`}
                />
                <div className="relative w-14 h-14 rounded-xl bg-green text-white flex items-center justify-center shadow-lg shadow-green/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex items-center justify-center gap-3 mb-2">
              {["Licensed", "Bonded", "Insured"].map((label, i) => (
                <span
                  key={label}
                  className={`text-xs font-bold tracking-wider uppercase text-dark transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${400 + i * 120}ms` }}
                >
                  {i > 0 && <span className="text-green mr-3">·</span>}
                  {label}
                </span>
              ))}
            </div>

            <p className="text-dark/60 text-sm mt-1">
              Fully covered for your peace of mind
            </p>

            {/* Decorative accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-green rounded-t-full transition-all duration-500 group-hover:w-24" />
          </div>

          {/* 100% Satisfaction card */}
          <div
            className={`group relative bg-gray-light rounded-2xl p-6 md:p-8 text-center transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {/* Check-shield icon */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div
                  className={`absolute inset-0 w-14 h-14 rounded-xl bg-gold/20 transition-all duration-700 ${
                    isVisible ? "animate-pulse-slow" : ""
                  }`}
                />
                <div className="relative w-14 h-14 rounded-xl bg-gold text-white flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Big 100% */}
            <div
              className="text-4xl md:text-5xl font-bold text-dark mb-1"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              100%
            </div>

            <p className="text-dark/60 text-sm">
              Satisfaction guaranteed — <span className="font-semibold text-dark">or your money back</span>
            </p>

            {/* Decorative accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gold rounded-t-full transition-all duration-500 group-hover:w-24" />
          </div>
        </div>
      </div>
    </section>
  );
}
