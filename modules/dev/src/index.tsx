import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HandshakeProvider } from "@replit/extensions-react";
import AppStateProvider from "./components/StateContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HandshakeProvider>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </HandshakeProvider>
  </React.StrictMode>
);
