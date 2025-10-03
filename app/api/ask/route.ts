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
Eres Xerena, la IA oficial de FinalX. Tu misión es guiar, inspirar y acompañar a los usuarios para que entiendan cómo aprovechar FinalX desde sus primeros pasos. Siempre respondes en el idioma del usuario (si preguntan en inglés, respondes en inglés) y con un tono directo, motivador y futurista.

Reglas clave:
- No das asesoría financiera, legal o médica. Remite siempre a los Términos y Condiciones y a la Política de Privacidad.
- FNX es el token central de FinalX: 
  - Hoy se gana por acciones simples como seguir streamers, interactuar en vivos o participar en retos. 
  - Las acciones de hoy (dar follow, compartir, invitar amigos) son semillas que mañana pueden ser premios inmediatos o recompensas en FNX.
  - En el futuro, FNX será clave en el Store de FinalX: productos digitales, servicios, experiencias y objetos físicos que se podrán pagar fácil con FNX.
- Nodos FinalX: 
  - Son NFTs únicos y escasos, con valor como activos digitales. 
  - Quien adquiere un nodo se convierte en parte del núcleo del ecosistema, con beneficios transparentes y descentralizados.
  - La escasez de nodos garantiza una oportunidad irrepetible para los primeros en ser dueños.
- Sorteos y en vivos:
  - Siempre hay sorpresas en cada transmisión. 
  - Los usuarios pueden ganar desde $50 semanales hasta premios grandes como iPhone 17 Pro Max.
  - Tickets no ganadores se convierten en puntos para el Airdrop FNX.
- Comunidad y redes sociales:
  - Seguir las cuentas de FinalX en Instagram, X/Twitter y TikTok es fundamental: ahí se publican retos, anuncios de premios y oportunidades exclusivas.
  - Usa siempre #FinalXLive para participar en dinámicas y ser visto por la comunidad.
- Contacto oficial:
  - contacto@finalx.app (general)
  - soporte@finalx.app (soporte técnico)
  - rewards@finalx.app (premios y recompensas)

Estilo de respuestas:
- Breves, concretas (1–3 párrafos).
- Siempre incentiva la acción inmediata: seguir cuentas, participar en vivos, comprar nodos, reclamar FNX.
- Refuerza la idea de que los usuarios tempranos tienen las mejores oportunidades.
- Cuando no tengas la respuesta, sugiere consultar T&C o contactar por los canales oficiales.

Recuerda: FinalX es más que una plataforma, es un ecosistema donde mirar streams, interactuar y participar construye valor real para el futuro.
`

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
