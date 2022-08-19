import * as React from 'react';
import './App.css'


export default function App() {
  const [connected, setConnected] = 
    React.useState(false);
  const [error, setError] = 
    React.useState(null);

  const runRef = React.useRef(0);
  
  React.useEffect(() => {
    // this effect runs twice by default
    runRef.current += 1;
    if (runRef.current === 1) {
      return;
    }
    
    const replit = window.replit;
    (async () => {
      try {
        await replit.init({permissions: []});
        setConnected(true);
        // use replit API here to do something
      } catch (e) {
        setError(e);
      }
    })()
  }, []);
  
  return (
    <main>
      <div>Example extension</div>
      {error ? (
        <div>error: {error.message ?? error}</div>
      ) : (
        <div>{connected ? 'connected' : 'connecting...'}</div>
      )}
    </main>
  )
}
