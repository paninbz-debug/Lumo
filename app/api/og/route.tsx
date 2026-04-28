import { ImageResponse } from "next/og";

export const runtime = "edge";

const BG = "#0A0908";
const TEXT = "#F2EAD3";
const SECONDARY = "#B8AC97";
const BRASS = "#B89968";
const COPPER = "#C77D4A";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? "LUMO").slice(0, 96);
  const subtitle = (
    searchParams.get("subtitle") ??
    "Жидкий металл, нанесённый как ремесло"
  ).slice(0, 160);
  const tag = (searchParams.get("tag") ?? "Студия LUMO · Партнёр AuraMetal").slice(0, 80);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          position: "relative",
          background: BG,
          color: TEXT,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* warm radial blob */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${COPPER}cc, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${BRASS}99, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />

        {/* tag pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 18px",
            border: "1px solid #3a322b",
            borderRadius: 999,
            color: SECONDARY,
            fontSize: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "JetBrains Mono, monospace",
            alignSelf: "flex-start",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: BRASS,
            }}
          />
          {tag}
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: title.length > 40 ? 64 : 84,
            lineHeight: 1.05,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: TEXT,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        {/* subtitle */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            lineHeight: 1.25,
            fontStyle: "italic",
            color: SECONDARY,
            maxWidth: 1040,
            fontFamily: "Cormorant Garamond, Georgia, serif",
          }}
        >
          {subtitle}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 40,
            color: SECONDARY,
            fontSize: 22,
            letterSpacing: 8,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", letterSpacing: 12 }}>LUMO</div>
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 16,
              letterSpacing: 4,
            }}
          >
            ХРОМИРОВАНИЕ-МОСКВА.РФ
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
