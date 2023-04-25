import { HandshakeProvider } from "@replit/extensions-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HandshakeProvider>
      <App />
    </HandshakeProvider>
  </React.StrictMode>
);
