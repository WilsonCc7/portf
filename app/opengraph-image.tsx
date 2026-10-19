import { ImageResponse } from "next/og";

export const alt = "Wilson Anggriawan, I design calm interfaces.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OgFont = {
  name: string;
  data: ArrayBuffer;
  style: "normal";
  weight: 400;
};

const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400&display=swap";
// satori only reads TrueType and OpenType containers, so ask Google Fonts for
// the .ttf build instead of the .woff2 one a modern browser UA gets back.
const FONT_UA = "Mozilla/5.0";

async function loadFonts(): Promise<OgFont[]> {
  const css = await fetch(FONT_CSS, {
    headers: { "User-Agent": FONT_UA },
  }).then((res) => res.text());
  const url = css.match(/url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error("no font url in css");
  const data = await fetch(url).then((res) => res.arrayBuffer());
  return [{ name: "Newsreader", data, style: "normal", weight: 400 }];
}

export default async function Image() {
  let fonts: OgFont[] = [];
  try {
    fonts = await loadFonts();
  } catch {
    fonts = [];
  }

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f7f8",
          color: "#14171a",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Wilson Anggriawan
          </div>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#5b6470",
              maxWidth: 900,
            }}
          >
            I design calm interfaces. And I keep asking why they work.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 20,
            letterSpacing: "0.08em",
            color: "#5b6470",
          }}
        >
          port.wilsb.me
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 6,
            background: "#1c5ce6",
          }}
        />
      </div>
    ),
    { ...size, fonts },
  );
}
