import { NextResponse } from "next/server";

export const runtime = "nodejs";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

// Orden de modelos a probar (primero el que te funcionó)
const MODEL_CANDIDATES = [
  "gemini-2.5-flash-preview-05-20", // el que ya te funcionó
  "gemini-2.0-flash",
  "gemini-1.5-flash-8b",
  "gemini-1.5-pro",
];

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

    // intentamos modelos en orden
    let lastErrorText = "";
    for (const model of MODEL_CANDIDATES) {
      const apiUrl =
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=` +
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
        lastErrorText = `(${r.status}) ${txt || "sin detalle"}`;

        // si es 404/NOT_FOUND por modelo, probamos el siguiente
        if (r.status === 404 || /NOT_FOUND/i.test(txt)) {
          continue;
        }
        // para otros errores, salimos
        return NextResponse.json(
          {
            error:
              "El proveedor de IA devolvió un error " +
              lastErrorText +
              ". Revisa clave/cuotas o nombre del modelo.",
          },
          { status: 502 }
        );
      }

      const data = (await r.json()) as any;
      const answer =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

      if (answer) {
        return NextResponse.json({ answer, modelUsed: model }, { status: 200 });
      }

      const feedback =
        data?.promptFeedback?.safetyRatings ||
        data?.candidates?.[0]?.safetyRatings ||
        null;

      // bloqueado por políticas: devolvemos el detalle
      return NextResponse.json(
        {
          error:
            "La respuesta fue bloqueada por las políticas del modelo." +
            (feedback ? " Detalle: " + JSON.stringify(feedback) : ""),
          modelUsed: model,
        },
        { status: 200 }
      );
    }

    // si ninguno funcionó
    return NextResponse.json(
      {
        error:
          "No fue posible generar respuesta con los modelos probados. Último error: " +
          lastErrorText,
      },
      { status: 502 }
    );
  } catch (e: any) {
    console.error("ask route error:", e);
    return NextResponse.json(
      { error: "Error interno del servidor: " + (e?.message || e) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
