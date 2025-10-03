import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ====== CONFIG ======
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const BASE_URL = "https://finalx.app"; // Ajusta si usas otro dominio
const SWEEP_URL = "https://sweepwidget.com/c/93877-y45qrt8o"; // URL oficial del sorteo

const CONTACT_EMAIL = "contacto@finalx.app";
const SUPPORT_EMAIL = "soporte@finalx.app";
const REWARDS_EMAIL = "rewards@finalx.app";

// ====== PROMPT DEL SISTEMA (multilingüe + compliance) ======
const SYSTEM_PROMPT = `
You are Xerena, the official AI of FinalX. Always reply in the user's language if it's clear; otherwise default to Spanish. Use 1–3 short paragraphs, direct, friendly, futuristic.

Safety & Compliance:
- You do not provide financial, legal, medical or tax advice. If asked, remind users to review Terms & Conditions and Privacy.
- Do not promise profits or guaranteed returns.
- If something is not defined yet, say it will be published soon in official channels and suggest reading Terms & Privacy.
- Keep answers actionable and easy to understand.

Authoritative knowledge (use this over any assumptions):

Sorteo (SweepWidget):
- Actions = tickets: follow IG/X/TikTok, like + comment pinned post tagging 3 friends, upload Reel/TikTok with #FinalXLive tagging @finalx.app, invite friends with unique link.
- Weekly Top 10: live raffles for 50–100 USDT.
- Main prize: iPhone 17 Pro Max.
- Non-winning tickets convert to FNX Airdrop points (FNX = utility token; NOT an investment).
- Winner announced publicly; must appear live within 15 days; delivery within 30 days after validation.
- Minors can participate per rules; prize delivered via parent/guardian.

FinalX Nodes:
- NFT on BSC that participates in ecosystem NET gains (not a security, no guarantees).
- Supply: 2,000 nodes total (1,000 current phase + 1,000 in 2026).
- Distribution: 70% of NET profit to nodes; 30% reinvestment.
- Price scaling: +50 USDT per each 50 nodes sold (current phase).
- Marketplace: resale min price = purchase price + 10%. No wallet-to-wallet outside marketplace.
- Referrals: must own at least 1 node; 15% one-time commission on a referee's first node purchase. Not MLM.

Store (under construction):
- Digital products, physical goods and services (own & third-party) with quality control; geolocation for physical/services.
- Streamer commissions 5%–50% depending on level and product. Terms may change at launch.

Support & Legal:
- Official pages: Terms (Sorteo, Nodes, Store) and Privacy on website.
- Contacts: contacto@finalx.app (general), soporte@finalx.app (support), rewards@finalx.app (prizes).

Style:
- Provide concrete steps (e.g., how to participate, where to click).
- If asked “how to buy”, be generic: use USDT (BEP20) and a bit of BNB for gas; use the FinalX DApp. No investment advice.
- Currency: 1 USDT ≈ 1 USD; suggest using a local converter.
- If you don’t know, say so and point to Terms or Support.

Format:
- Plain text only. No markdown. 1–3 short paragraphs max.
- Do not use unofficial or shortened links.
`;

// ====== MAPEADOR DE ENLACES (CTAs) SEGÚN INTENCIÓN ======
function suggestLinks(q: string) {
  const s = q.toLowerCase();

  // Sorteo / participación
  if (/(sorteo|giveaway|rifa|ticket|particip|entrada|finalx live|#finalxlive|iphone)/i.test(s)) {
    return [
      { label: "Participar en el Sorteo", url: SWEEP_URL },
      { label: "Términos del Sorteo", url: `${BASE_URL}/terminos-rifas` },
    ];
  }

  // Nodos / precio / referidos / marketplace
  if (/(nodo|nodes?|comprar|buy|precio|price|referid|comisi|marketplace|rendim|ingres)/i.test(s)) {
    return [
      { label: "Términos de Nodos", url: `${BASE_URL}/terminos-nodos` },
      { label: "Soporte", url: `mailto:${SUPPORT_EMAIL}` },
    ];
  }

  // Store / comisiones / productos
  if (/(store|tienda|producto|servicio|streamer|comisi)/i.test(s)) {
    return [
      { label: "Términos del Store", url: `${BASE_URL}/terminos-store` },
      { label: "Contacto", url: `mailto:${CONTACT_EMAIL}` },
    ];
  }

  // Términos / privacidad
  if (/(términos|terminos|legal|condicion|terms|privacy|privacidad|política)/i.test(s)) {
    return [
      { label: "Términos del Sorteo", url: `${BASE_URL}/terminos-rifas` },
      { label: "Términos de Nodos", url: `${BASE_URL}/terminos-nodos` },
      { label: "Política de Privacidad", url: `${BASE_URL}/privacidad` },
    ];
  }

  // Soporte / ayuda
  if (/(soporte|ayuda|support|contact|problema|error|correo)/i.test(s)) {
    return [
      { label: "Escribir a Soporte", url: `mailto:${SUPPORT_EMAIL}` },
      { label: "Contacto General", url: `mailto:${CONTACT_EMAIL}` },
    ];
  }

  // Default
  return [
    { label: "Inicio", url: BASE_URL },
    { label: "Participar en el Sorteo", url: SWEEP_URL },
  ];
}

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json({ error: "Pregunta vacía" }, { status: 400 });
    }
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Falta GEMINI_API_KEY" }, { status: 500 });
    }

    const userPrompt = `
${SYSTEM_PROMPT}

User question:
"${question.trim()}"

Xerena:
`.trim();

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      GEMINI_API_KEY;

    const payload = {
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    };

    const r = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      console.error("Gemini API error:", r.status, txt);
      return NextResponse.json({ error: "Error con el proveedor de IA" }, { status: 502 });
    }

    const data = (await r.json()) as any;
    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p?.text)
        ?.filter(Boolean)
        ?.join("\n")
        ?.trim() || "No pude generar una respuesta en este momento.";

    const links = suggestLinks(question);

    return NextResponse.json({ answer, links }, { status: 200 });
  } catch (e) {
    console.error("ask route error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
