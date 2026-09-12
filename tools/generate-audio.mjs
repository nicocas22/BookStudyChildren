import { webcrypto } from "node:crypto";
if (!globalThis.crypto) globalThis.crypto = webcrypto;
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { parse } from "node-html-parser";
import fs from "fs";
import path from "path";

const PROJECT = "C:/Users/Nicog/Desktop/Estudios Peques/guias-estudio";
const VOICE = process.env.VOICE || "es-CL-CatalinaNeural";
const OUTDIR = path.join(PROJECT, "audio", "incas");
fs.mkdirSync(OUTDIR, { recursive: true });

const html = fs.readFileSync(path.join(PROJECT, "index.html"), "utf8");
const root = parse(html);
const screen = root.querySelector("#screen-incas");
const sections = screen.querySelectorAll("section.topic");

function sectionText(sec) {
  const parts = [];
  sec.querySelectorAll("h2,p,li,figcaption").forEach(el => {
    el.querySelectorAll(".icon,.credit").forEach(x => x.remove());
    const t = el.text.replace(/\s+/g, " ").trim();
    if (t) parts.push(t);
  });
  // Unir con punto para pausas naturales
  return parts.join(". ").replace(/\.\./g, ".");
}

async function synth(text, outPath) {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(text);
  const out = fs.createWriteStream(outPath);
  audioStream.pipe(out);
  await new Promise((res, rej) => { out.on("finish", res); out.on("error", rej); audioStream.on("error", rej); });
  try { tts.close(); } catch(e){}
}

const manifest = [];
for (const sec of sections) {
  const id = sec.getAttribute("id");
  const text = sectionText(sec);
  const outPath = path.join(OUTDIR, id + ".mp3");
  process.stdout.write(`${id} (${text.length} chars)… `);
  await synth(text, outPath);
  const size = fs.statSync(outPath).size;
  manifest.push({ id, chars: text.length, bytes: size });
  console.log(`${Math.round(size/1024)}KB`);
}
fs.writeFileSync(path.join(OUTDIR, "manifest.json"), JSON.stringify(manifest, null, 2));
const total = manifest.reduce((a,b)=>a+b.bytes,0);
console.log(`--- ${manifest.length} audios, voz ${VOICE}, total ${Math.round(total/1024)}KB ---`);
process.exit(0);
