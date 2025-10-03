import { NextResponse } from "next/server";

export const runtime = "nodejs"; // usar runtime Node en Vercel

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!; // clave desde Variables de Entorno en Vercel

// --- Prompt de sistema actualizado con SweepWidget y reglas ---
const SYSTEM_PROMPT_ES = `
Eres Xerena, IA oficial de FinalX. Respondes en español (o en el idioma del usuario), con 1–3 párrafos claros, tono directo, amable y futurista.

Reglas clave:
- No das asesoría financiera, legal o médica. Si te lo piden, recuerda al usuario que lea los Términos y Condiciones.
- Tokens FNX: token de utilidad por participación; no es inversión ni promesa de rentabilidad.
- Nodos FinalX: compra voluntaria con riesgo; precio escalable; ingresos del ecosistema sin garantías. Remite a Términos y Condiciones.
- Sorteos: gestionados con SweepWidget; acciones = tickets; Top 10 semanal con premios $50–$100; sorteo principal iPhone 17 Pro Max. Tickets no ganadores → puntos para Airdrop FNX.
- Entrega de premios: ganador anunciado públicamente; debe presentarse en vivo máx. 15 días; entrega máx. 30 días.
- Menores: pueden participar bajo reglas; si gana un menor, entrega solo vía padre/madre/tutor legal.
- Contacto: contacto@finalx.app (general), soporte@finalx.app (soporte), rewards@finalx.app (premios).
- Si el usuario quiere participar directamente en rifas: redirígelo a 👉 https://sweepwidget.com/c/93877-y45qrt8o

Estilo:
- Sé específico con pasos (seguir IG/X, comentar post fijado, invitar amigos, usar #FinalXLive).
- Cuando no sepas, dilo y sugiere leer T&C o la Política de Privacidad del sitio.
- Si el usuario escribe en inglés u otro idioma, traduce tu respuesta automáticamente a ese idioma.
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

    // Construimos el prompt final
    const userPrompt = `
${SYSTEM_PROMPT_ES}

Usuario: "${question.trim()}"
Xerena:
`.trim();

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
      GEMINI_API_KEY;

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

// ✅ GET opcional para probar la ruta en producción
export async function GET() {
  return NextResponse.json({ ok: true });
}