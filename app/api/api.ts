const API_URL = "http://localhost:8000/api";

export type ChatListItem = {
  chat_id: string;
  created_at: string;
  message_count: number;
  last_message: string | null;
};

export type ChatMessage = {
  role: string;
  content: string;
  timestamp: string;
};

export type ChatDetail = {
  chat_id: string;
  created_at: string;
  messages: ChatMessage[];
};

export async function listChats() {
  const response = await fetch(`${API_URL}/chats`);
  
  if (!response.ok) {
    throw new Error(`Failed to list chats: ${response.statusText}`);
  }
  
  return response.json();
}

export async function createNewChat() {
  const response = await fetch(`${API_URL}/chat/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to create chat: ${response.statusText}`);
  }

  return response.json();
}

export async function getChat(chatId: string): Promise<ChatDetail> {
  const response = await fetch(`${API_URL}/chat/${chatId}`);

  if (!response.ok) {
    throw new Error(`Failed to get chat: ${response.statusText}`);
  }

  return response.json();
}

export async function deleteChat(chatId: string) {
  const response = await fetch(`${API_URL}/chat/${chatId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete chat: ${response.statusText}`);
  }

  return response.json();
}

export async function askQuestion(
  question: string,
  chatId: string | null = null
) {
  const response = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      chat_id: chatId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to ask question: ${response.statusText}`);
  }

  return response.json();
}
