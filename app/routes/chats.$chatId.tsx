import { useParams, useOutletContext } from "react-router";
import Chat from "../components/Chat";

type LayoutContext = {
  onMessageSent: () => void;
};

export default function ChatRoute() {
  const { chatId } = useParams();
  const { onMessageSent } = useOutletContext<LayoutContext>();

  if (!chatId) return null;

  return <Chat chatId={chatId} onMessageSent={onMessageSent} />;
}
