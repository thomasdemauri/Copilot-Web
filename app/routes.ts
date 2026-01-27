import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  // Layout principal
  route(
    "", // <--- MUDE ISSO: De "_layout" para "" (string vazia) ou "/"
    "routes/_layout.tsx",
    [
      // Página inicial "/"
      // O 'index' define que esta rota responde pela raiz do pai ("/")
      index("routes/home.tsx"), 
      
      // Workspace dinâmico "/workspaces/:workspaceId"
      route("workspaces/:workspaceId", "routes/workspaces.$workspaceId.tsx"),
    ]
  ),
] satisfies RouteConfig;