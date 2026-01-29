import type { Route } from "./+types/home";
import { useOutletContext } from "react-router";
import Chat from "../components/Chat";

type LayoutContext = {
  onMessageSent: () => void;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Olist Copilot" },
    { name: "description", content: "Intelligent data analysis for Olist" },
  ];
}

export default function Home() {
  const { onMessageSent } = useOutletContext<LayoutContext>();
  
  return <Chat chatId={null} disableAppearance={true} onMessageSent={onMessageSent} />;
}
