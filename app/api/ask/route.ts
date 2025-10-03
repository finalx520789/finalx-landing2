import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ejecuta como función Node en Vercel

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

// Prompt de sistema
const SYSTEM_PROMPT_ES = `
Eres Xerena, IA oficial de FinalX. Respondes en el idioma del usuario (si pregunta en inglés, respondes en inglés), en 1–3 párrafos claros, tono directo, amable y futurista.

Reglas clave:
- No das asesoría financiera, legal o médica. Remite a Términos y Condiciones y Política de Privacidad.
- Tokens FNX: token de utilidad por participación; no es inversión ni promesa de rentabilidad.
- Nodos FinalX: compra voluntaria con riesgo; precio escalable; ingresos del ecosistema sin garantías. Remite a T&C.
- Sorteos: gestionados con SweepWidget; acciones = tickets; Top 10 semanal con premios $50–$100; sorteo principal iPhone 17 Pro Max. Tickets no ganadores → puntos para Airdrop FNX.
- Entrega de premios: ganador anunciado públicamente; debe presentarse en vivo máx. 15 días; entrega máx. 30 días.
- Menores: si gana un menor, entrega solo vía padre/madre/tutor legal.
- Enlaces útiles: participa aquí 👉 https://sweepwidget.com/c/93877-y45qrt8o
- Contacto: contacto@finalx.app (general), soporte@finalx.app (soporte), rewards@finalx.app (premios).

Estilo:
- Sé específico con pasos (seguir IG/X, comentar post fijado, invitar amigos, usar #FinalXLive).
- Si no tienes el dato, dilo y sugiere revisar T&C.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const question = typeof body?.question === "string" ? body.question.trim() : "";

    if (!question) {
      return NextResponse.json({ error: "Pregunta vacía" }, { status: 400 });
    }
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Falta GEMINI_API_KEY en variables de entorno." },
        { status: 500 }
      );
    }

    const userPrompt = `${SYSTEM_PROMPT_ES}

Usuario: "${question}"
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
      return NextResponse.json(
        {
          error:
            "El proveedor de IA devolvió un error (" +
            r.status +
            "). " +
            (txt || "Revisa tu clave, cuotas o el nombre del modelo."),
        },
        { status: 502 }
      );
    }

    const data = (await r.json()) as any;

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

    if (answer) {
      return NextResponse.json({ answer }, { status: 200 });
    }

    // Si no hubo candidatos (bloqueo por políticas o sin salida)
    const feedback =
      data?.promptFeedback?.safetyRatings ||
      data?.candidates?.[0]?.safetyRatings ||
      null;

    return NextResponse.json(
      {
        error:
          "La respuesta fue bloqueada por las políticas del modelo. " +
          (feedback ? "Detalle: " + JSON.stringify(feedback) : ""),
      },
      { status: 200 } // 200 para que el cliente muestre el texto
    );
  } catch (e: any) {
    console.error("ask route error:", e);
    return NextResponse.json(
      { error: "Error interno del servidor: " + (e?.message || e) },
      { status: 500 }
    );
  }
}

// GET para healthcheck
export async function GET() {
  return NextResponse.json({ ok: true });
}
