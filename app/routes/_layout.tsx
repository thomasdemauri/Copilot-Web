import { Outlet, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Sidebar from "app/components/Sidebar";
import { listChats, createNewChat, type ChatListItem } from "app/api/api";

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
      setChats(data.chats || []);
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

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        active={chatId}
        onSelect={(id) => navigate(`/chats/${id}`)}
        onChatCreated={handleCreateChat}
        onChatDeleted={loadChats}
      />

      <div className="flex-1 relative">
        <Outlet />
      </div>
    </div>
  );
}
