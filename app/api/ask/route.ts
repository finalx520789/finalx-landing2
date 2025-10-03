import { NextResponse } from "next/server";

export const runtime = "nodejs"; // usa Node runtime en Vercel

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!; // <-- la añadimos en .env y en Vercel

// --- Prompt de sistema de Xerena (actualizado) ---
const SYSTEM_PROMPT_ES = `
Eres Xerena, IA oficial de FinalX. Respondes en español, en 1–3 párrafos claros, tono directo, amable y futurista.

Reglas:
- No das asesoría financiera, legal o médica. Si te lo piden, recuérdalo y remite a Términos y Condiciones.
- Tokens FNX: token de utilidad por participación; no es inversión. No prometer rentabilidad.
- Nodos FinalX: compra voluntaria con riesgo; precio escalable; ingresos del ecosistema sin garantías. Remite a T&C.
- Sorteos: gestionados con SweepWidget; acciones = tickets; Top 10 semanal con premios $50–$100; sorteo principal iPhone 17 Pro Max. Tickets no ganadores → puntos para Airdrop FNX.
- Entrega de premios: ganador anunciado públicamente; debe presentarse en vivo en máx. 15 días; entrega en máx. 30 días.
- Menores: pueden participar según reglas; si gana un menor, entrega solo vía padre/madre/tutor legal.
- Si hay dudas legales/compliance: remite a Términos y Condiciones y Política de Privacidad del sitio.
- Contacto: contacto@finalx.app (general), soporte@finalx.app (soporte), rewards@finalx.app (premios).

Estilo:
- Sé específico con pasos (seguir IG/X, comentar post fijado, invitar amigos, usar #FinalXLive).
- Cuando no sepas, dilo y sugiere leer T&C. Evita consejos financieros.
`;

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json({ error: "Pregunta vacía" }, { status: 400 });
    }
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Falta GEMINI_API_KEY" }, { status: 500 });
    }

    // Construimos el prompt final que verá el modelo
    const userPrompt = `
${SYSTEM_PROMPT_ES}

Usuario: "${question.trim()}"
Xerena:
`.trim();

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: userPrompt }],
        },
      ],
    };

    const r = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Evita caching en edge/CDN
      cache: "no-store",
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      console.error("Gemini API error:", r.status, txt);
      return NextResponse.json({ error: "Error con el proveedor de IA" }, { status: 502 });
    }

    const data = (await r.json()) as any;
    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No pude generar una respuesta en este momento.";

    return NextResponse.json({ answer }, { status: 200 });
  } catch (e) {
    console.error("ask route error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
