import fs from "fs";

const path = "src/app/self-publishing/lp/SelfPublishingLpClient.tsx";
let s = fs.readFileSync(path, "utf8");
s = s.replace(/tabIndex="-1"/g, "tabIndex={-1}");
s = s.replace(/\{\/\*([\s\S]*?)\*\//g, (m, inner) => {
  const cleaned = String(inner).replace(/--+/g, "—");
  return `{/*${cleaned}*/`;
});
fs.writeFileSync(path, s);
console.log("patched", path);
