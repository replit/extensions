import * as React from 'react';
import { useReplit } from '@replit/extensions/react';
import './App.css'

export default function App() {
  const {connected, error, filePath, replit} = useReplit();

  React.useEffect(() => {
    if (!connected) {
      return;
    }

    console.log(replit);
  }, [connected, error, replit])

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
