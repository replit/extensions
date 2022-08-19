import * as React from 'react';
import './App.css'


export default function App() {
  const [connected, setConnected] = 
    React.useState(false);
  const [error, setError] = 
    React.useState(null);
  
  React.useEffect(() => {
    const replit = window.replit;
    (async () => {
      try {
        await replit.init({permissions: []});
        setConnected(true);
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
