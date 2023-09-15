import React from 'react';
import * as replit from '@replit/extensions';
import "./App.css";

export default function App() {
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      window.replit = replit;
      await replit.init();
      setConnected(true);
      
      // your code here
    })()
  }, []);

  return (
    <div>
      {connected ? 'Connected' : 'Not Connected'}
    </div>
  )
}
