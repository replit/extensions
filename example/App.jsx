import * as React from "react";
import {
  useReplit,
  useWatchTextFile,
  useTheme,
} from "@replit/extensions/react";
import "./App.css";

export default function App() {
  const { status, error, filePath, replit } = useReplit();

  const theme = useTheme();

  React.useEffect(() => {
    if (status !== "ready") {
      return;
    }

    console.log(replit);
    window.replit = replit;
  }, [status, error, replit]);

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
              {status === "ready"
                ? filePath
                  ? `connected to ${filePath}`
                  : "connected"
                : "connecting..."}
              <hr />
              {filePath}
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
