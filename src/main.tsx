import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import "@/global.css";
import { queryClient } from "./lib/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
