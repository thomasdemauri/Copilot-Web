import { useState, useEffect } from "react";
import { askQuestion, getChat, type ChatMessage as APIChatMessage } from "app/api/api";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant" | "error";
  content: string;
  timestamp?: string;
};

export default function Chat({ chatId, disableAppearance = false }: { chatId: string | null; disableAppearance?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chatId) {
      loadChatHistory(chatId);
    } else {
      setMessages([]);
    }
  }, [chatId]);

  async function loadChatHistory(id: string) {
    try {
      const chat = await getChat(id);
      const formattedMessages: Message[] = chat.messages.map((msg: APIChatMessage) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
        timestamp: msg.timestamp,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      setMessages([]);
    }
  }

  async function send() {
    if (!input || loading) return;

    const question = input;
    setInput("");
    setLoading(true);

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const res = await askQuestion(question, chatId);
      
      const assistantMessage: Message = {
        role: "assistant",
        content: res.answer,
        timestamp: res.timestamp,
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
      const errorMessage: Message = {
        role: "error",
        content: "Desculpe, ocorreu um erro ao processar sua pergunta. Verifique sua conexão e tente novamente.",
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      {!disableAppearance && (
        <div className="border-b border-gray-200 bg-white px-6 py-5 shadow-sm">
          <h1 className="text-center text-xl font-semibold text-gray-900">Chat BI</h1>
          <p className="text-center text-sm text-gray-500 mt-1">Análise inteligente de dados Olist</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-gray-900 font-medium mb-2">Faça uma pergunta</h3>
                <p className="text-gray-500 text-sm">Comece digitando uma pergunta sobre os dados Olist para obter insights</p>
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className="flex gap-4 animate-fadeIn">
              {m.role === "user" ? (
                <>
                  <div className="flex-1" />
                  <div className="flex gap-3 max-w-2xl">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-3 text-sm leading-relaxed shadow-sm">
                      {m.content}
                    </div>
                  </div>
                </>
              ) : m.role === "error" ? (
                <>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-red-50 border border-red-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <p className="text-sm text-red-700 font-medium">{m.content}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                    IA
                  </div>
                  <div className="flex-1 max-w-2xl">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <div className="text-sm text-gray-700 prose prose-sm max-w-none prose-p:my-1 prose-li:my-0">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 animate-fadeIn">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                <p className="text-sm text-gray-500">IA está pensando...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-6 py-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-all focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta sobre os dados Olist..."
            onKeyDown={(e) => e.key === "Enter" && !loading && send()}
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full p-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
