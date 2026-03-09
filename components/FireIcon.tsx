"use client";

export default function FireIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 23C16.97 23 21 18.97 21 14C21 9.03 16.97 3.5 12 1C7.03 3.5 3 9.03 3 14C3 18.97 7.03 23 12 23Z"
        fill="url(#fire-gradient)"
        stroke="url(#fire-stroke)"
        strokeWidth="0.5"
      />
      <path
        d="M12 20C14.76 20 17 17.76 17 15C17 12.24 14.76 8 12 6C9.24 8 7 12.24 7 15C7 17.76 9.24 20 12 20Z"
        fill="url(#fire-inner)"
      />
      <defs>
        <linearGradient id="fire-gradient" x1="12" y1="1" x2="12" y2="23">
          <stop stopColor="#FF6B35" />
          <stop offset="1" stopColor="#FF8C42" />
        </linearGradient>
        <linearGradient id="fire-stroke" x1="12" y1="1" x2="12" y2="23">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FF6B35" />
        </linearGradient>
        <linearGradient id="fire-inner" x1="12" y1="6" x2="12" y2="20">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FF8C42" />
        </linearGradient>
      </defs>
    </svg>
  );
}
