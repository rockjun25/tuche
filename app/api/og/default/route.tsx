import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET() {
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
          backgroundColor: "#F0EBE3",
          position: "relative",
        }}
      >
        {/* Geometric accents — editorial feel */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "120px",
            width: "180px",
            height: "240px",
            backgroundColor: "#1A1A1A",
            borderRadius: "4px",
            transform: "rotate(6deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "100px",
            right: "160px",
            width: "160px",
            height: "220px",
            backgroundColor: "#FDC700",
            borderRadius: "4px",
            transform: "rotate(-3deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "100px",
            width: "140px",
            height: "180px",
            backgroundColor: "#FDC700",
            borderRadius: "4px",
            opacity: 0.5,
            transform: "rotate(4deg)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "140px",
            width: "120px",
            height: "160px",
            backgroundColor: "#1A1A1A",
            borderRadius: "4px",
            transform: "rotate(-2deg)",
            display: "flex",
          }}
        />

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            zIndex: 1,
          }}
        >
          {/* Tuché badge */}
          <div
            style={{
              backgroundColor: "#FDC700",
              padding: "10px 28px",
              borderRadius: "28px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#1A1A1A",
            }}
          >
            Tuché
          </div>

          {/* Wordmark */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 800,
              color: "#1A1A1A",
              letterSpacing: "-2px",
            }}
          >
            Tuché
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              color: "#666",
              fontWeight: 500,
            }}
          >
            글의 기록
          </div>

          {/* Divider */}
          <div
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: "#FDC700",
              marginTop: "10px",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
