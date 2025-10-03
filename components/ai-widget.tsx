"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        const msg = await response.text().catch(() => "");
        throw new Error(msg || "Error al consultar la IA");
      }

      const data = await response.json();
      setAnswer(data.answer || "No se recibió respuesta");
    } catch (err) {
      setError("Error al conectar con la IA. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#FBBF24] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FBBF24]/90 transition-all"
        aria-label="Pregunta a la IA"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#0b0b0b]" />
        ) : (
          <MessageCircle className="w-6 h-6 text-[#0b0b0b]" />
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-[#111] rounded-2xl border border-[#FBBF24]/30 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#FBBF24]/10 px-6 py-4 border-b border-[#333]">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#FBBF24]" />
              Pregunta a la IA
            </h3>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {/* Input */}
            <div className="space-y-3">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Escribe tu pregunta sobre FinalX..."
                className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#333] rounded-xl text-[#F3F4F6] placeholder:text-[#666] focus:outline-none focus:border-[#FBBF24] resize-none"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAsk();
                  }
                }}
              />

              <button
                onClick={handleAsk}
                disabled={isLoading || !question.trim()}
                className="w-full px-4 py-3 bg-[#FBBF24] text-[#0b0b0b] rounded-xl font-semibold hover:bg-[#FBBF24]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Consultando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Preguntar
                  </>
                )}
              </button>
            </div>

            {/* Answer */}
            {answer && (
              <div className="bg-[#1f1f1f] rounded-xl p-4 border border-[#333]">
                <p
                  className="text-[#F3F4F6] text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
