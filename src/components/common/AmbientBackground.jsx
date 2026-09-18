import React from "react";

export const AmbientBackground = ({ variant = "default" }) => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Top Left Radial Glow */}
      <div className="absolute top-[8%] left-[-12%] w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full bg-highlight/5 blur-[120px] pointer-events-none" />

      {/* Middle/Right Radial Glow */}
      <div className="absolute top-[42%] right-[-12%] w-[360px] h-[360px] md:w-[500px] md:h-[500px] rounded-full bg-purple-500/5 blur-[140px] pointer-events-none" />

      {/* Bottom Left / Center Accent Glow */}
      <div className="absolute bottom-[10%] left-[10%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full bg-emerald-500/5 blur-[110px] pointer-events-none" />

      {variant === "cyan" && (
        <div className="absolute top-[65%] right-[25%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      )}
    </div>
  );
};

export default AmbientBackground;
