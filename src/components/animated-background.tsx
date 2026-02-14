"use client";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Pulsing grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.72 0.19 195 / 0.12) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.72 0.19 195 / 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          animation: "pulse-line 8s ease-in-out infinite",
        }}
      />

      {/* Floating gradient orbs — more visible, slow drift */}
      <div
        className="absolute top-[10%] left-[15%] h-[700px] w-[700px] rounded-full blur-[150px]"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.19 195 / 0.14), transparent 70%)",
          animation: "drift-slow 40s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[45%] right-[5%] h-[600px] w-[600px] rounded-full blur-[140px]"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.15 300 / 0.12), transparent 70%)",
          animation: "drift-slow 35s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[5%] left-[35%] h-[550px] w-[550px] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.16 160 / 0.10), transparent 70%)",
          animation: "drift-slow 45s ease-in-out infinite",
          animationDelay: "-15s",
        }}
      />
      {/* Extra orb top-right for more coverage */}
      <div
        className="absolute top-[5%] right-[20%] h-[500px] w-[500px] rounded-full blur-[140px]"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.17 250 / 0.09), transparent 70%)",
          animation: "drift-slow 50s ease-in-out infinite",
          animationDelay: "-25s",
        }}
      />

      {/* Floating dots — neural nodes */}
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            background: `oklch(0.72 0.19 ${195 + (i * 12) % 120} / ${0.15 + (i % 5) * 0.05})`,
            top: `${8 + (i * 4.5) % 84}%`,
            left: `${5 + (i * 6.8) % 90}%`,
            animation: `float-particle ${16 + (i % 7) * 4}s ease-in-out infinite`,
            animationDelay: `${-(i * 1.8)}s`,
          }}
        />
      ))}
    </div>
  );
}
