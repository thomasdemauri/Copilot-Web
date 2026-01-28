import type { Route } from "./+types/home";
import Chat from "../components/Chat";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chat BI - Olist" },
    { name: "description", content: "Análise inteligente de dados Olist" },
  ];
}

export default function Home() {
  return <Chat chatId={null} disableAppearance={true} />;
}
