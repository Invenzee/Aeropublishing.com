import fs from "fs";

let html = fs.readFileSync(
  "C:/Users/Invenzee/Downloads/files (3)-extracted/index.html",
  "utf8",
);
const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/);
let body = bodyMatch[1];
body = body.replace(/<script[\s\S]*?<\/script>/g, "");

const repl = [
  [/Stamford Publishers/g, "Aero Publishing"],
  [/stamfordpublishers\.com/g, "aeropublishing.com"],
  [/\(562\) 573-2551/g, "(424) 282-3304"],
  [/\+15625732551/g, "+14242823304"],
  [/sales@stamfordpublishers\.com/g, "admin@aeropublishing.com"],
  [/https:\/\/www\.aeropublishing\.com\/book-writing/g, "/ghost-writing"],
  [/https:\/\/www\.aeropublishing\.com\/book-editing/g, "/book-editing"],
  [/https:\/\/www\.aeropublishing\.com\/book-cover-design/g, "/book-cover-design"],
  [/https:\/\/www\.aeropublishing\.com\/book-publishing/g, "/book-publishing"],
  [/https:\/\/www\.aeropublishing\.com\/book-marketing/g, "/book-marketing"],
  [/https:\/\/www\.aeropublishing\.com\/audiobook/g, "/audio-book-narration"],
  [/https:\/\/www\.aeropublishing\.com\/?"/g, '/"'],
  [/https:\/\/www\.aeropublishing\.com\/about-us/g, "/about"],
  [/https:\/\/www\.aeropublishing\.com\/childrens-books/g, "/children-book"],
  [/https:\/\/www\.aeropublishing\.com\/author-website/g, "/authors-website"],
  [/https:\/\/www\.aeropublishing\.com\/contact-us/g, "/contact-us"],
  [/https:\/\/www\.aeropublishing\.com\/privacy-policy/g, "/privacy-policy"],
  [/https:\/\/www\.aeropublishing\.com\/terms-of-service/g, "/terms-and-conditions"],
  [/https:\/\/aeropublishing\.com\/book-writing/g, "/ghost-writing"],
  [/https:\/\/aeropublishing\.com\/book-editing/g, "/book-editing"],
  [/https:\/\/aeropublishing\.com\/book-cover-design/g, "/book-cover-design"],
  [/https:\/\/aeropublishing\.com\/book-publishing/g, "/book-publishing"],
  [/https:\/\/aeropublishing\.com\/book-marketing/g, "/book-marketing"],
  [/https:\/\/aeropublishing\.com\/audiobook/g, "/audio-book-narration"],
  [/https:\/\/aeropublishing\.com\/?"/g, '/"'],
  [/https:\/\/aeropublishing\.com\/about-us/g, "/about"],
  [/https:\/\/aeropublishing\.com\/childrens-books/g, "/children-book"],
  [/https:\/\/aeropublishing\.com\/author-website/g, "/authors-website"],
  [/https:\/\/aeropublishing\.com\/contact-us/g, "/contact-us"],
  [/https:\/\/aeropublishing\.com\/privacy-policy/g, "/privacy-policy"],
  [/https:\/\/aeropublishing\.com\/terms-of-service/g, "/terms-and-conditions"],
];

for (const [a, b] of repl) body = body.replace(a, b);

body = body.replace(/\bclass=/g, "className=");
body = body.replace(/\bfor=/g, "htmlFor=");
body = body.replace(/stroke-width=/g, "strokeWidth=");
body = body.replace(/stroke-linecap=/g, "strokeLinecap=");
body = body.replace(/stroke-linejoin=/g, "strokeLinejoin=");
body = body.replace(/fill-opacity=/g, "fillOpacity=");
body = body.replace(/stop-color=/g, "stopColor=");
body = body.replace(/stop-opacity=/g, "stopOpacity=");
body = body.replace(/stroke-dasharray=/g, "strokeDasharray=");
body = body.replace(/text-anchor=/g, "textAnchor=");
body = body.replace(/font-family=/g, "fontFamily=");
body = body.replace(/font-size=/g, "fontSize=");
body = body.replace(/font-weight=/g, "fontWeight=");
body = body.replace(/clip-path=/g, "clipPath=");
body = body.replace(/tabindex=/g, "tabIndex=");
body = body.replace(/autocomplete=/g, "autoComplete=");
body = body.replace(/&nbsp;/g, "{'\\u00a0'}");
body = body.replace(/&larr;/g, "←");
body = body.replace(/&amp;/g, "&");

body = body.replace(/<(input|img|br|hr|source|meta|link)([^>]*?)>/gi, (m, tag, attrs) => {
  if (/\/\s*$/.test(attrs)) return m;
  return `<${tag}${attrs} />`;
});

body = body.replace(/style="([^"]*)"/g, (m, s) => {
  const obj = s
    .split(";")
    .filter(Boolean)
    .map((p) => {
      const idx = p.indexOf(":");
      if (idx < 0) return null;
      const k = p.slice(0, idx).trim();
      const val = p.slice(idx + 1).trim();
      const key = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      if (/^-?\d+(\.\d+)?px$/.test(val)) {
        return `${key}: ${parseFloat(val)}`;
      }
      return `${key}: "${val.replace(/"/g, '\\"')}"`;
    })
    .filter(Boolean)
    .join(", ");
  return `style={{${obj}}}`;
});

// Comments that look like JSX issues
body = body.replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}");

fs.writeFileSync("src/app/self-publishing/lp/_body.jsxfrag", body);
console.log("wrote fragment", body.length);
