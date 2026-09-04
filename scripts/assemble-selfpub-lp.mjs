import fs from "fs";

let body = fs.readFileSync("src/app/self-publishing/lp/_body.jsxfrag", "utf8");
body = body.replace(/sales@aeropublishing\.com/g, "admin@aeropublishing.com");
body = body.replace(/placeholder="\(562\) 555 0134"/g, 'placeholder="(424) 555 0134"');

const out = `"use client";

import { useRef } from "react";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { useSelfPubEffects } from "./useSelfPubEffects";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--sp-fh",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--sp-fb",
  display: "swap",
});

export default function SelfPublishingLpClient() {
  const rootRef = useRef<HTMLDivElement>(null);
  useSelfPubEffects(rootRef);

  return (
    <div
      ref={rootRef}
      className={\`sp-lp sp-lp-root \${manrope.variable} \${sourceSerif.variable} \${manrope.className}\`}
      style={
        {
          ["--fh"]: "var(--sp-fh), system-ui, sans-serif",
          ["--fb"]: "var(--sp-fb), Georgia, serif",
          fontFamily: "var(--fb)",
        } as React.CSSProperties
      }
    >
${body}
    </div>
  );
}
`;

fs.writeFileSync("src/app/self-publishing/lp/SelfPublishingLpClient.tsx", out);
console.log("wrote SelfPublishingLpClient.tsx", out.length);
