import { Outlet, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import Sidebar from "app/components/Sidebar";
import { listChats, createNewChat, getChat, type ChatListItem } from "app/api/api";
import { isAuthenticated, logoutUser } from "app/utils/auth";

export default function ChatLayout() {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { chatId } = useParams();
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    loadChats();
  }, [navigate]);

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
      console.error("Error loading chats:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateChat() {
    try {
      const newChat = await createNewChat();
      await loadChats();
      navigate(`/app/chats/${newChat.chat_id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Error creating chat. Try again.");
    }
  }

  async function handleChatDeleted(deletedChatId: string) {
    await loadChats();
    // If the deleted chat was active, redirect to home
    if (chatId === deletedChatId) {
      navigate("/app");
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        active={chatId}
        onSelect={(id) => navigate(`/app/chats/${id}`)}
        onChatCreated={handleCreateChat}
        onChatDeleted={handleChatDeleted}
        onLogout={() => {
          logoutUser();
          navigate("/login");
        }}
      />

      <div className="flex-1 relative">
        <Outlet context={{ onMessageSent: loadChats }} />
      </div>
    </div>
  );
}
