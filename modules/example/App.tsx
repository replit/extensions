import * as React from "react";
import {
  HandshakeStatus,
  exec,
  messages,
  extensionPort,
  proxy,
  ExecResult,
} from "@replit/extensions";
import { useReplit } from "@replit/extensions-react";
import "./App.css";

export default function App() {
  const { status, error, filePath, replit } = useReplit();

  if (typeof window !== "undefined") {
    // @ts-ignore
    window.replit = replit;
  }

  const execute = async () => {
    const dispose = await exec({
      args: ["pnpm", "lint"],
      env: {},
      onOutput: (a: string) => {
        messages.showConfirm(a);
      },
      onEnd: (a) => {
        messages.showNotice(a.output);
        messages.showWarning(String(a.exitCode));
        messages.showError(String(a.error));
      },
    });

    // dispose();
  };

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
          <button onClick={execute}>Exec</button>
        </div>
      </div>
    </main>
  );
}
