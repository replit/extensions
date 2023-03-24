import * as React from "react";
import {
  useReplit,
  useWatchTextFile,
  useTheme,
  useReplitEffect,
} from "@replit/extensions/react";
import { messages } from "@replit/extensions";
import "./App.css";

export default function App() {
  const { status, error, filePath } = useReplit({
    debug: true,
  });

  const connected: boolean = status === "ready";

  const { content, watching, watchError, writeChange } = useWatchTextFile({
    filePath: "test.json",
  });

  const theme = useTheme();

  const sendMessage = () => {
    messages.showNotice("THIS IS A TEST");
  };

  useReplitEffect(async ({ data }) => {
    await messages.showConfirm(JSON.stringify(await data.currentUser()));
  }, []);

  const randomizeJson = async () => {
    try {
      const json = JSON.parse(content);

      const randomKey =
        Object.keys(json)[Math.floor(Math.random() * Object.keys(json).length)];

      json[randomKey] = Math.random();

      await writeChange({
        from: 0,
        to: content.length,
        insert: JSON.stringify(json, null, 2),
      });
    } catch (e) {
      await messages.showError("Error randomizing JSON");
    }
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
              <button onClick={randomizeJson}>Randomize JSON</button>
              <hr />
              {watching ? "watching" : "not watching " + watchError} |{" "}
              {filePath}
              <hr />
              <pre>{content}</pre>
            </div>
          )}
        </div>
      </div>
      {theme && (
        <style>{`
          body {
            background-color: ${theme.values.global.backgroundDefault};
            color: ${theme.values.global.foregroundDefault};
          }
        `}</style>
      )}
    </main>
  );
}
