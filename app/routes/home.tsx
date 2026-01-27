import type { Route } from "./+types/home";
import Chat from "../components/Chat";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Chat workspace={null} disableAppearance={true} />;
}
