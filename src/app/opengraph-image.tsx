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
          background: "#081E3D",
          color: "#f4f6fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="74" viewBox="192 211 264 301">
            <path fill="#FFFFFF" d="M340 211 L340 254 Q340 260 336 261 C310 268 260 281 240 296 C225 307 220 326 231 342 C243 359 265 374 283 388 L330 431 Q334 434 330 437 L275 466 Q272 469 269 466 C220 430 190 389 192 325 L192 276 C238 245 287 228 340 211 Z" />
            <path fill="#109FB5" d="M359 222 L359 258 Q359 263 365 266 L456 310 L456 267 C426 247 397 233 359 222 Z" />
            <path fill="#109FB5" d="M404 309 L456 335 C454 413 421 449 329 512 L286 482 C354 446 398 425 406 365 Q410 353 402 356 L317 396 Q315 398 311 395 L304 389 L304 354 Q304 350 308 348 C340 333 371 320 404 309 Z" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600 }}>CyberGlyph Security</div>
        </div>
        <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -3, maxWidth: 900 }}>
          Secure the business you&rsquo;re building.
        </div>
        <div style={{ fontSize: 28, color: "#9fb4cc" }}>
          Cybersecurity and technology services for small and midsize businesses
        </div>
      </div>
    ),
    size,
  );
}
