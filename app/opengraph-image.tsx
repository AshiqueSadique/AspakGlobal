import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          background: "linear-gradient(135deg, #0d2352 0%, #1a4a90 60%, #2255a8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          <span style={{ color: "#ffffff" }}>ASPAK&nbsp;</span>
          <span style={{ color: "#d4a820" }}>GLOBAL</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 8,
            color: "#f8e878",
          }}
        >
          CONNECTING SOLUTIONS, CREATING VALUE
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            width: 240,
            height: 4,
            background: "#c9a020",
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
