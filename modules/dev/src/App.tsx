import { HandshakeStatus } from "@replit/extensions";
import { useReplit } from "@replit/extensions-react";
import "./App.css";

export default function App() {
  const { replit, status } = useReplit()

  const connected = status === HandshakeStatus.Ready;

  return <div>{connected ? "Connected" : "Not Connected"}</div>;
}
