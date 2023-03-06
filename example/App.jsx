import * as React from 'react';
import * as replit from '@replit/extensions';
import './App.css'

export default function App() {
  const [connected, setConnected] =
    React.useState(false);
  const [error, setError] =
    React.useState(null);
  const [filePath, setFilePath] = React.useState(null);
  
  const runRef = React.useRef(0);

  React.useEffect(() => {
    window.replit = replit;

    // this effect runs twice by default
    runRef.current += 1;
    if (runRef.current === 1) {
      return;
    }

    (async () => {
      try {
        await replit.init({ permissions: [] });
        setFilePath(await replit.me.filePath());
        setConnected(true);
        // use replit API here to do something
      } catch (e) {
        setError(e);
      }
    })()
  }, []);

  return (
    <main>
      <div className="center">
        <div>
          <div className="heading">Example extension</div>
          {error ? (
            <>
              <div className="error">error: {error.message ?? error}</div>
              {error.message === "timeout" ? (
                <div>Note: Make sure to open this URL as an extension, not a webview</div>
              ) : null}
            </>
          ) : (
            <div>{connected ? (filePath ? `connected to ${filePath}`: 'connected') : 'connecting...'}</div>
          )}
        </div>
      </div>
    </main>
  )
}
