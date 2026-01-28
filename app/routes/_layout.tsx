import { Outlet, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Sidebar from "app/components/Sidebar";
import { listChats, createNewChat, getChat, type ChatListItem } from "app/api/api";

export default function ChatLayout() {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { chatId } = useParams();
  const navigate = useNavigate();

  // Carregar chats ao montar o componente
  useEffect(() => {
    loadChats();
  }, []);

  async function loadChats() {
    try {
      const data = await listChats();
      const chatsWithFirstMessage = await Promise.all(
        (data.chats || []).map(async (chat) => {
          try {
            const chatDetail = await getChat(chat.chat_id);
            const firstUserMessage = chatDetail.messages.find(msg => msg.role === "user");
            return {
              ...chat,
              first_message: firstUserMessage?.content || null
            };
          } catch {
            return { ...chat, first_message: null };
          }
        })
      );
      setChats(chatsWithFirstMessage);
    } catch (error) {
      console.error("Erro ao carregar chats:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateChat() {
    try {
      const newChat = await createNewChat();
      await loadChats();
      navigate(`/chats/${newChat.chat_id}`);
    } catch (error) {
      console.error("Erro ao criar chat:", error);
      alert("Erro ao criar chat. Tente novamente.");
    }
  }

  async function handleChatDeleted(deletedChatId: string) {
    await loadChats();
    // Se o chat deletado era o ativo, redirecionar para home
    if (chatId === deletedChatId) {
      navigate("/");
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        active={chatId}
        onSelect={(id) => navigate(`/chats/${id}`)}
        onChatCreated={handleCreateChat}
        onChatDeleted={handleChatDeleted}
      />

      <div className="flex-1 relative">
        <Outlet context={{ onMessageSent: loadChats }} />
      </div>
    </div>
  );
}
