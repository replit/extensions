import { HandshakeStatus, experimental, messages } from "@replit/extensions";
import { useReplit, useThemeValues } from "@replit/extensions-react";
import "../public/App.css";
import Header from "./components/Header";
import { UnitTest } from "./components/Test";
import TestGroup from "./components/TestGroup";

export default function App() {
  const { status, error } = useReplit();

  const tokens = useThemeValues();

  const mappedThemeValues = tokens
    ? Object.entries(tokens).map(
        ([key, val]) =>
          `--${key.replace(
            /[A-Z]/g,
            (c) => "-" + c.toLowerCase()
          )}: ${val} !important;`
      )
    : [];

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
        <style>{`:root {
${mappedThemeValues.join("\n")}
        }`}</style>
        <Header />

        <div style={{ padding: 8 }}>
          <TestGroup
            title="fs Module"
            tests={[
              { state: "passed", text: "fs.readFile should successfully return a file's contents", time: "0.2s" },
              { state: "passed", text: "fs.writeFile should successfully write contents to a non-utf-8 file", time: "0.3s" },
              { state: "failed", text: "fs.readDir should return an array of Directory Child Nodes", time: "4.15s" },
              { state: "passed", text: "fs.createDir should successfully create a directory", time: "4s" },
              { state: "loading", text: "fs.deleteFile should successfully delete a file", time: "0.2s" },
              { state: "idle", text: "fs.deleteDir should delete a directory and all its children", time: "--" },
            ]}
          />
        </div>
      </main>
    );
  }
}
