import * as React from "react";
import {
  useReplit,
  useWatchTextFile,
  useTheme,
} from "@replit/extensions/react";
import { messages } from "@replit/extensions";
import "./App.css";

export default function App() {
  const { status, replit, error, filePath } = useReplit({
    debug: true,
  });

  const connected = status === "ready";

  const { content, watching, watchError } = useWatchTextFile({
    filePath: "package.json",
  });

  const theme = useTheme();

  React.useEffect(() => {
    if (!connected) {
      return;
    }

    // @ts-ignore
    window.replit = replit;
    console.log(replit);
  }, [connected, error, replit]);

  const sendMessage = () => {
    messages.showNotice("THIS IS A TEST");
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
              {connected
                ? filePath
                  ? `connected to ${filePath}`
                  : "connected"
                : "connecting..."}

              <button onClick={sendMessage}>Click</button>
            </div>
          )}
        </div>
      </div>
      {theme && (
        <style global jsx>{`
          body {
            background-color: ${theme.values.global.backgroundDefault};
            color: ${theme.values.global.foregroundDefault};
          }
        `}</style>
      )}
    </main>
  );
}
