import { useParams } from "react-router";
import Chat from "../components/Chat";

export default function ChatRoute() {
  const { chatId } = useParams();

  if (!chatId) return null;

  return <Chat chatId={chatId} />;
}
