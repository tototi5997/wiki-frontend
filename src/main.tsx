import ReactDOM from "react-dom/client";
import { RouterComponent } from "./router.tsx";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "virtual:svg-icons-register";
import "./i18n.ts";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterComponent>
      <App />
    </RouterComponent>
  </QueryClientProvider>
);
