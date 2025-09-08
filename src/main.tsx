import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import "./index.css";

// Debug logging for Vercel deployment
console.log("Main.tsx loaded");
console.log("Environment:", import.meta.env.MODE);
console.log("API URL:", import.meta.env.VITE_API_URL);

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
} else {
  console.log("Root element found, mounting React app");
  try {
    createRoot(rootElement).render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    console.log("React app mounted successfully");
  } catch (error) {
    console.error("Error mounting React app:", error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">Error mounting app: ${error}</div>`;
  }
}
