import { useState } from "react";
import { deleteChat } from "app/api/api";
import DeleteChatModal from "./DeleteChatModal";

type ChatItem = {
  chat_id: string;
  created_at: string;
  message_count: number;
  first_message?: string | null;
  last_message?: string | null;
};

type Props = {
  chats: ChatItem[];
  active?: string;
  onSelect: (chatId: string) => void;
  onChatCreated: () => void;
  onChatDeleted: (deletedChatId: string) => void;
  onLogout?: () => void;
};

export default function Sidebar({
  chats = [],
  active,
  onSelect,
  onChatCreated,
  onChatDeleted,
  onLogout,
}: Props) {
  const [openMenuChat, setOpenMenuChat] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);
  const [deletingChat, setDeletingChat] = useState(false);

  const handleDeleteChat = async () => {
    if (!deleteModalOpen) return;

    setDeletingChat(true);
    try {
      await deleteChat(deleteModalOpen);
      setOpenMenuChat(null);
      setDeleteModalOpen(null);
      onChatDeleted(deleteModalOpen);
    } catch (error) {
      console.error("Error deleting chat:", error);
      alert("Error deleting chat. Try again.");
    } finally {
      setDeletingChat(false);
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm h-screen">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          Chats
        </h1>
        <p className="text-xs text-gray-500 mt-1">Olist Data Analysis</p>
      </div>

      {/* Chats List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!chats || chats.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-900">No chats yet</p>
            <p className="text-xs text-gray-500 mt-2">Create one to get started</p>
          </div>
        ) : (
          [...chats]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .map((chat) => (
            <div key={chat.chat_id} className="group">
              {/* Chat Item */}
              <div className="flex items-center gap-0 rounded-lg transition-all hover:bg-gray-50 group relative">
                <button
                  onClick={() => onSelect(chat.chat_id)}
                  className={`flex-1 text-left px-3 py-2.5 rounded-md transition-all ${
                    active === chat.chat_id
                      ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      active === chat.chat_id ? "bg-blue-600" : "bg-gray-300"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">{formatDate(chat.created_at)}</span>
                        {chat.message_count > 0 && (
                          <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                            active === chat.chat_id 
                              ? "bg-blue-100 text-blue-700" 
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {chat.message_count}
                          </span>
                        )}
                      </div>
                      {(chat.first_message || chat.last_message) && (
                        <p className="text-sm font-medium mt-1 overflow-hidden" style={{ 
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: '1.3rem',
                          maxHeight: '2.6rem'
                        }}>
                          {chat.first_message || chat.last_message}
                        </p>
                      )}
                      {!chat.first_message && !chat.last_message && (
                        <p className="text-sm text-gray-400 italic mt-1">
                          Empty chat
                        </p>
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Menu Button */}
                <button
                  onClick={() => setOpenMenuChat(openMenuChat === chat.chat_id ? null : chat.chat_id)}
                  className="px-2 py-2.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors flex-shrink-0 rounded"
                  title="Menu"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>

                {/* Context Menu */}
                {openMenuChat === chat.chat_id && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-max">
                    <button
                      onClick={() => setDeleteModalOpen(chat.chat_id)}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </nav>

      {/* Delete Chat Modal */}
      {deleteModalOpen && (
        <DeleteChatModal
          onConfirm={handleDeleteChat}
          onCancel={() => setDeleteModalOpen(null)}
          isLoading={deletingChat}
        />
      )}

      {/* Create Button and Logout */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
        <button
          onClick={onChatCreated}
          className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          New Chat
        </button>
        
        <button
          onClick={onLogout}
          className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
