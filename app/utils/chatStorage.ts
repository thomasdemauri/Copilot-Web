export type Message = {
  role: "user" | "assistant" | "error";
  content: string;
  insight?: string;
};

const STORAGE_KEY = "copilot-chat-";

export function getChatMessages(workspace: string): Message[] {
  try {
    const key = `${STORAGE_KEY}${workspace}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading chat messages:", error);
    return [];
  }
}

export function saveChatMessages(workspace: string, messages: Message[]): void {
  try {
    const key = `${STORAGE_KEY}${workspace}`;
    localStorage.setItem(key, JSON.stringify(messages));
  } catch (error) {
    console.error("Error saving chat messages:", error);
  }
}

export function clearChatMessages(workspace: string): void {
  try {
    const key = `${STORAGE_KEY}${workspace}`;
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error clearing chat messages:", error);
  }
}
