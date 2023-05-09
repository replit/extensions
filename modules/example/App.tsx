import * as React from "react";
import { useReplit } from "@replit/extensions-react";
import * as replit from "@replit/extensions";
import "./App.css";
const { HandshakeStatus } = replit;

export default function App() {
  const { status, error, filePath } = useReplit();

  if (typeof window !== "undefined") {
    window.replit = replit;
  }

  return (
    <main>
      <div className="center">
        <div>
          <div className="heading">Example extension</div>
          {error ? (
            <>
              <div className="error">error: {error.message ?? error}</div>
              {error.message === "timeout" ? (
                <div>
                  Note: Make sure to open this URL as an extension, not a
                  webview
                </div>
              ) : null}
            </>
          ) : (
            <div>
              {status === HandshakeStatus.Ready
                ? filePath
                  ? `connected to ${filePath}`
                  : "connected"
                : "connecting..."}
            </div>
          )}
          <span>{status}</span>
        </div>
      </div>
    </main>
  );
}
