import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          background: "linear-gradient(180deg, #1a0f08 0%, #0c0806 100%)",
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 900,
            letterSpacing: 8,
            textTransform: "uppercase",
            backgroundImage: "linear-gradient(180deg, #f6d888 0%, #e8994a 55%, #a8611f 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          Old Monk
        </div>
        <div style={{ fontSize: 32, color: "#f3ead999", display: "flex" }}>
          80s &amp; 90s Bollywood playlist for daaru nights with friends
        </div>
      </div>
    ),
    { ...size }
  );
}
