import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  // Layout principal
  route(
    "",
    "routes/_layout.tsx",
    [
      // Página inicial "/"
      index("routes/home.tsx"), 
      
      // Chat dinâmico "/chats/:chatId"
      route("chats/:chatId", "routes/chats.$chatId.tsx"),
    ]
  ),
] satisfies RouteConfig;