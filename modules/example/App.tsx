import * as React from "react";
import { HandshakeStatus } from "@replit/extensions";
import { useReplit } from "@replit/extensions-react";
import "./App.css";

export default function App() {
  const { status, error, filePath } = useReplit();

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
