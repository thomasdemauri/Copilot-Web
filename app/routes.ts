import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  // Landing page
  index("routes/index.tsx"),
  
  // Login route
  route("login", "routes/login.tsx"),
  
  // Register route
  route("register", "routes/register.tsx"),
  
  // Protected layout with chats
  route(
    "app",
    "routes/_layout.tsx",
    [
      // Home page "/app"
      index("routes/home.tsx"), 
      
      // Dynamic chat "/app/chats/:chatId"
      route("chats/:chatId", "routes/chats.$chatId.tsx"),
    ]
  ),
] satisfies RouteConfig;