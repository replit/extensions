import * as React from 'react';
import './App.css'


export default function App() {
  React.useEffect(() => {
    const replit = window.replit;
    console.log(replit);
  }, []);
  
  return (
    <main>
      Replit Extensions
    </main>
  )
}
