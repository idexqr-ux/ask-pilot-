async function loadCSV(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  const text = await res.text();

// Fix: some exports wrap EACH WHOLE ROW in quotes, making it a 1-column CSV.
// If a line starts/ends with a quote and does NOT contain '","', strip the outer quotes.
const fixedText = text
  .split(/\r?\n/)
  .map(line => {
    const s = line.trim();
    if (s.startsWith('"') && s.endsWith('"') && s.includes(",") && !s.includes('","')) {
      return s.slice(1, -1);
    }
    return line;
  })
  .join("\n");

return parseCSV(fixedText);
}

function parseCSV(text) {
  const firstLine = (text.split(/\r?\n/).find(l => l.trim().length) || "");
  const delimiter = (firstLine.includes("\t") && !firstLine.includes(",")) ? "\t" : ",";

  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"' && inQuotes && next === '"') { cell += '"'; i++; continue; }
    if (c === '"') { inQuotes = !inQuotes; continue; }

    if (c === delimiter && !inQuotes) { row.push(cell); cell = ""; continue; }

    if ((c === "\n" || c === "\r") && !inQuotes) {
      if (cell.length || row.length) { row.push(cell); rows.push(row); }
      cell = ""; row = [];
      if (c === "\r" && next === "\n") i++;
      continue;
    }
if (question.includes("modern distance") || question.includes("1 mile 4 furlongs")) {
  answer = `
  1 mile 4 furlongs is approximately 2.4 kilometres.

  1 mile equals 1.609 km.
  1 furlong equals 201 metres.
  Four furlongs add roughly 804 metres.

  Together, that makes just over 2.4 km.

  For context, that’s around a steady 12–15 minute jog for many recreational runners, 
  or a brisk 25–30 minute walk.
  `;
}

else if (question.includes("dam's sire") || question.includes("maternal grandfather")) {
  answer = `
  The dam (mother) may not have raced, and in many cases may never have raced.

  The dam’s sire — the maternal grandfather — was usually a proven racehorse.

  Traits such as stamina, speed tendencies, physical type, and temperament 
  can influence performance across generations.

  Listing the dam’s sire provides deeper insight into inherited characteristics,
  especially when the dam herself may never have raced.
  `;
}
    cell += c;
  }

  if (cell.length || row.length) { row.push(cell); rows.push(row); }

  const rawHeaders = (rows.shift() || []);
  const headers = rawHeaders.map(h => String(h).replace(/^\uFEFF/, "").trim());
  return rows
    .filter(r => r.length && r.some(x => String(x).trim() !== ""))
    .map(r => Object.fromEntries(headers.map((h, idx) => [h, String(r[idx] ?? "").trim()])));
}

    cell += c;
  }

  if (cell.length || row.length) { row.push(cell); rows.push(row); }

  const headers = (rows.shift() || []).map(h => h.trim());
  return rows
    .filter(r => r.length && r.some(x => String(x).trim() !== ""))
    .map(r => Object.fromEntries(headers.map((h, idx) => [h, (r[idx] ?? "").trim()])));
}

function qs(name) {
  return new URLSearchParams(location.search).get(name);
}
