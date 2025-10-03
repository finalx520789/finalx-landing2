import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// — Prompt de sistema —
const SYSTEM_PROMPT_ES = `
Eres Xerena, IA oficial de FinalX. Respondes en español (o en el idioma del usuario), en 1–3 párrafos claros, tono directo, amable y futurista.

Reglas:
- No das asesoría financiera, legal o médica. Si te lo piden, recuérdalo y remite a Términos y Condiciones.
- Tokens FNX: token de utilidad por participación; no es inversión. No prometer rentabilidad.
- Nodos FinalX: compra voluntaria con riesgo; precio escalable; ingresos del ecosistema sin garantías. Remite a T&C.
- Sorteos: gestionados con SweepWidget; acciones = tickets; Top 10 semanal con premios $50–$100; sorteo principal iPhone 17 Pro Max. Tickets no ganadores → puntos para Airdrop FNX.
- Entrega: ganador anunciado públicamente; debe presentarse en vivo en máx. 15 días; entrega en máx. 30 días.
- Menores: si gana un menor, entrega solo vía padre/madre/tutor legal.
- Dudas legales o de privacidad: remite a Términos y Condiciones y Política de Privacidad.
- Contacto: contacto@finalx.app (general), soporte@finalx.app (soporte), rewards@finalx.app (premios).

Instrucciones:
- Sé específico con pasos (seguir IG/X, comentar post fijado, invitar amigos con link, usar #FinalXLive).
- Ofrece CTA útiles (ej. “Participa aquí: https://finalx.app/sorteo”), y si preguntan por el widget: https://sweepwidget.com/c/93877-y45qrt8o
- Si no sabes algo, dilo y sugiere leer T&C. Evita consejos financieros.
`;

export async function GET() {
  return NextResponse.json({
    ok: true,
    envHasKey: Boolean(GEMINI_API_KEY),
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { "Access-Control-Allow-Methods": "POST,GET,OPTIONS" },
  });
}

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("content-type")?.includes("application/json") !== true) {
      return NextResponse.json(
        { error: "Content-Type debe ser application/json" },
        { status: 415 }
      );
    }

    const body = await req.json().catch(() => null);
    const question = typeof body?.question === "string" ? body.question.trim() : "";

    if (!question) return NextResponse.json({ error: "Pregunta vacía" }, { status: 400 });
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Falta GEMINI_API_KEY en el entorno" }, { status: 500 });
    }

    // Modelo ESTABLE (no preview)
    const MODEL = "gemini-1.5-flash";

    const userPrompt = `
${SYSTEM_PROMPT_ES}

Usuario: "${question}"
Xerena:
`.trim();

    const apiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=` +
      GEMINI_API_KEY;

    const payload = {
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.5,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 512,
      },
      // Hacemos los filtros menos bloqueantes (sin desactivar seguridad básica)
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
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
      let msg = "Proveedor IA respondió con error";
      if (r.status === 429) msg = "Límite de uso alcanzado. Intenta en unos minutos.";
      return NextResponse.json({ error: msg, status: r.status }, { status: 502 });
    }

    const data = (await r.json()) as any;

    // Si el modelo bloquea o no devuelve texto, tratamos de detectar motivo:
    const candidate = data?.candidates?.[0];
    const parts = candidate?.content?.parts || [];
    const text = parts.map((p: any) => p?.text).filter(Boolean).join("\n").trim();

    const finishReason = candidate?.finishReason; // e.g. "STOP", "SAFETY", "OTHER"
    if (!text) {
      if (finishReason && finishReason !== "STOP") {
        return NextResponse.json(
          {
            error:
              "El modelo bloqueó la respuesta por políticas de seguridad. Reformula la pregunta de forma neutral (p. ej., “¿Cómo participo en el sorteo?”).",
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: "No pude generar una respuesta en este momento. Intenta de nuevo." },
        { status: 200 }
      );
    }

    return NextResponse.json({ answer: text }, { status: 200 });
  } catch (e: any) {
    console.error("ask route error:", e);
    return NextResponse.json(
      { error: e?.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}

