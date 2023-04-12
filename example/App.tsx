import * as React from "react";
import {
  useReplit
} from "@replit/extensions/react";
import { messages } from "@replit/extensions";
import "./App.css";

export default function App() {
  const { status, error } = useReplit();

  return (
    <main>
      <div className="center">
        <div>
          <div className="heading">Example extension</div>
          <button onClick={() => messages.showConfirm("eeeee")}>eeeee</button>
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
              {status}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
