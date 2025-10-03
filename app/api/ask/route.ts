import { NextResponse } from "next/server";

export const runtime = "nodejs"; // usar runtime Node en Vercel

// PON TU API KEY EN VERCEL: Settings → Environment Variables → GEMINI_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const MODEL = "gemini-1.5-flash"; // estable y rápido

// GET opcional solo para verificación rápida (devolverá 200)
export async function GET() {
  return NextResponse.json({ ok: true });
}

/**
 * Sistema/Contexto:
 * - Responde en el idioma del usuario (auto).
 * - Tono directo, amable y futurista (Xerena).
 * - Incluye enlaces ÚNICAMENTE permitidos abajo.
 */
const SYSTEM_PROMPT = `
Eres “Xerena”, IA oficial de FinalX. Responde en el mismo idioma del usuario, en 1–3 párrafos claros, tono directo, amable y futurista.

Reglas:
- No das asesoría financiera, legal o médica. Si te lo piden, recuérdalo y remite a Términos y Condiciones y Política de Privacidad del sitio.
- Tokens FNX: token de utilidad por participación; no es inversión. No prometer rentabilidad.
- Nodos FinalX: compra voluntaria con riesgo; precio escalable; ingresos del ecosistema sin garantías. Remite a T&C.
- Sorteos: gestionados con SweepWidget; acciones = tickets; Top 10 semanal con premios $50–$100; sorteo principal iPhone 17 Pro Max. Tickets no ganadores → puntos para Airdrop FNX.
- Entrega de premios: ganador anunciado públicamente; debe presentarse en vivo máx. 15 días; entrega máx. 30 días.
- Menores: si gana un menor, entrega solo vía padre/madre/tutor legal.
- Si hay dudas de cumplimiento: remite a T&C y Privacidad.

Enlaces permitidos (solamente estos):
- Sorteo (SweepWidget): https://sweepwidget.com/c/93877-y45qrt8o
- Web FinalX: https://finalx.app
- Contacto: contacto@finalx.app (general), soporte@finalx.app (soporte), rewards@finalx.app (premios)

Cuando sugieras enlaces, usa etiquetas HTML <a href="..." target="_blank" rel="noopener noreferrer">Texto</a>.
Evita enlaces distintos a los permitidos. Si te piden otros, explica que no puedes enlazarlos y ofrece alternativas seguras.
`;

// Sanitiza la respuesta para permitir sólo algunos <a> y <br>
function sanitizeToHtml(text: string) {
  // Permitimos break lines y anchors con target/rel forzados
  const withBreaks = text.replace(/\n/g, "<br>");
  // Convierte URLs permitidas en <a> seguro (por si el modelo devuelve texto “limpio”)
  const allow = [
    "https://sweepwidget.com/c/93877-y45qrt8o",
    "https://finalx.app",
  ];
  let html = withBreaks;

  for (const url of allow) {
    const re = new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    html = html.replace(
      re,
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
  }

  // Si el modelo ya envió <a ...>, dejamos pasar pero reforzamos target/rel
  html = html.replace(
    /<a\s+([^>]*href="https?:\/\/[^"]+"[^>]*)>/gi,
    (m, attrs) => {
      // Sólo permitimos si tiene alguno de los dominios permitidos
      if (!/(sweepwidget\.com|finalx\.app)/i.test(attrs)) return ""; // lo quitamos
      // Aseguramos target/rel
      let safe = attrs
        .replace(/\s*target="[^"]*"/i, "")
        .replace(/\s*rel="[^"]*"/i, "");
      safe += ` target="_blank" rel="noopener noreferrer"`;
      return `<a ${safe}>`;
    }
  );

  return html;
}

export async function POST(req: Request) {
  try {
    const { question } = (await req.json()) as { question?: string };

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json({ error: "Pregunta vacía" }, { status: 400 });
    }
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Falta GEMINI_API_KEY" }, { status: 500 });
    }

    const userPrompt = `
${SYSTEM_PROMPT}

Usuario: "${question.trim()}"
Xerena:
`.trim();

    const apiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      // Puedes añadir safetySettings si tu cuenta lo requiere
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
    const raw =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No pude generar una respuesta en este momento.";

    const answer = sanitizeToHtml(raw);
    return NextResponse.json({ answer }, { status: 200 });
  } catch (e) {
    console.error("ask route error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
