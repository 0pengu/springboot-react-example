import router from "@/lib/router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import ReactQueryProvider from "@/lib/query-provider";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools />
    </ReactQueryProvider>
  </StrictMode>
);
