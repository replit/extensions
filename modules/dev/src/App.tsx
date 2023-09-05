import { HandshakeStatus } from "@replit/extensions";
import { useReplit, useThemeValues } from "@replit/extensions-react";
import { useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import { useAppState } from "./components/StateContext";
import TestGroup from "./components/TestGroup";
import UnitTests from "./tests";

export default function App() {
  const { status, error } = useReplit();
  const { logs, setLogs } = useAppState();
  const logRef = useRef<HTMLDivElement>(null);

  const tokens = useThemeValues({
    setCssVariables: true,
  });

  useEffect(() => {
    logRef?.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [logs, logRef]);

  if (status === HandshakeStatus.Loading) {
    return (
      <main
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Loading...</h2>
      </main>
    );
  } else if (status === HandshakeStatus.Error) {
    return (
      <main
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Error: {error.message}</h2>
      </main>
    );
  } else {
    return (
      <main
        style={{
          background: tokens?.backgroundDefault,
          color: tokens?.foregroundDefault,
        }}
      >
        <Header />

        <div style={{ flexGrow: 1, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflowY: "auto",
              padding: 8,
            }}
          >
            {Object.values(UnitTests)
              .sort((a, b) => a.module.localeCompare(b.module))
              .map(({ module }, i) => (
                <TestGroup module={module} key={i} />
              ))}
          </div>
        </div>

        <div className="logs">
          <div className="logs-head">
            <span>Logs</span>
            <button
              className="button"
              onClick={() => setLogs([])}
              disabled={logs.length === 0}
            >
              Clear
            </button>
          </div>
          {logs.length > 0 ? (
            <div className="logs-scroll" ref={logRef}>
              {logs.map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </div>
          ) : null}
        </div>
      </main>
    );
  }
}
