import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import router from "./router/router";
import { ThemeProvider } from "./components/theme-provider";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} position="top-right" />
    </ThemeProvider>
  </StrictMode>
);
