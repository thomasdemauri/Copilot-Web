import { useState } from "react";
import { askQuestion } from "app/api/api";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
  insight?: string;
};

export default function Chat({ workspace }: { workspace: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input || loading) return;

    const question = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
    ]);

    try {
      console.log("Enviando pergunta:", question);
      const res = await askQuestion(workspace, question);
      console.log("Resposta recebida:", res);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.answer, insight: res.insight },
      ]);
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 py-4 px-4">
        <h1 className="text-center text-2xl font-bold text-gray-900">Chat BI</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((m, i) => (
            <div key={i} className="mb-6">
              {m.role === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-4 rounded-lg max-w-2xl">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-4 rounded-lg max-w-2xl">
                    <div className="mb-3">
                      <h3 className="font-semibold text-gray-900 mb-2">Resposta:</h3>
                      <div className="text-gray-800 prose prose-sm max-w-none">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    </div>
                    {m.insight && (
                      <div className="border-t border-gray-300 pt-3 mt-3">
                        <h3 className="font-semibold text-gray-900 mb-2">Insight:</h3>
                        <div className="text-gray-800 prose prose-sm max-w-none">
                          <ReactMarkdown>{m.insight}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm text-gray-500">IA está pensando...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            className="flex-1 border border-gray-300 p-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta sobre seus dados..."
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button
            onClick={send}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  );
}
