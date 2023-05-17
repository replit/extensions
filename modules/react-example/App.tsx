import * as React from "react";
import { HandshakeStatus, experimental, messages } from "@replit/extensions";
import { useReplit } from "@replit/extensions-react";
import "./App.css";

export default function App() {
  const { status, error, filePath, replit } = useReplit();

  if (typeof window !== "undefined") {
    // @ts-ignore
    window.replit = replit;
  }

  const execute = async () => {
    const { result: out, kill } = await experimental.exec({
      args: "tsc --noEmit --watch",
      onOutput: (output) => {
        messages.showConfirm(output);
      },
    });

    setTimeout(() => {
      kill();
      messages.showError("Killed");
    }, 3000);

    messages.showWarning((await out).output);
  };

  return (
    <main>
      <div className="center">
        <div>
          <div className="heading">React Example extension</div>
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
          <button onClick={execute}>Exec</button>
        </div>
      </div>
    </main>
  );
}
