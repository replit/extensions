import * as React from 'react';
import './App.css'


export default function App() {
  const [connected, setConnected] = 
    React.useState(false);
  React.useEffect(() => {
    const replit = window.replit;
    (async () => {
      await replit.init({permissions: []});
      setConnected(true);
    })()
  }, []);
  
  return (
    <main>
      <div>Example extension</div>
      <div>{connected ? 'connected' : 'connecting...'}</div>
    </main>
  )
}
