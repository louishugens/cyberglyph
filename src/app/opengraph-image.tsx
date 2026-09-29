import { ImageResponse } from "next/og";

export const alt = "CyberGlyph Security. Secure the business you're building.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0e1119",
          color: "#f4f6fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path d="M24.5 8.2A11 11 0 1 0 24.5 23.8" stroke="#f4f6fb" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="16" cy="13.6" r="3.2" fill="#4f86ff" />
            <path d="M14.6 15.5h2.8l.9 6h-4.6z" fill="#4f86ff" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600 }}>CyberGlyph Security</div>
        </div>
        <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -3, maxWidth: 900 }}>
          Secure the business you&rsquo;re building.
        </div>
        <div style={{ fontSize: 28, color: "#9aa3b8" }}>
          Security, identity, AI automation, and web engineering in New York
        </div>
      </div>
    ),
    size,
  );
}
