# Replit Extensions API Client

The Replit Extensions client is a module that allows you to easily interact with the Workspace through [Comlink](https://www.npmjs.com/package/comlink).

 - [Repository](https://github.com/replit/extensions)
 - [NPM Package](https://www.npmjs.com/package/@replit/extensions)
 - [Documentation](https://docs.replit.com/extensions)
  - [Resources](https://docs.replit.com/extensions/resources)
  - [API Modules](https://docs.replit.com/extensions/category/api-reference)
  - [React Hooks](https://docs.replit.com/extensions/category/react-hooks)
 - [Discord Server](https://discord.gg/replit-devs)
 - [React Extension Template](https://replit.com/@replit/React-Extension?v=1)
 - [HTML/CSS/JS Extension Template](https://replit.com/@replit/HTMLCSSJS-Extension?v=1)

[![Run on Replit button](https://docimg.replit.com/images/run-on-replit.png)](https://replit.com/github/replit/extensions)

## Installation

```
npm install @replit/extensions
yarn add @replit/extensions
pnpm add @replit/extensions
```

## Usage

**Note**: Make sure you have access to the Extensions Developer Beta.  If not, you can apply for access [here](https://replit.com/@replit/Extensions-Beta).

1. Fork the [React Template](https://replit.com/@replit/React-Extension?v=1) on Replit and run the Repl
2. Use **cmd**/**ctrl** + K to open up the command bar
3. Hit **Manage extensions** > **Add an extension by URL**
4. In the sidebar, you should see your extension pop up under **Extensions Devtools**.  Click it to open it.
5. Hit each of the buttons in the output to confirm that the extension works.
6. Create a simple file creator extension:

```jsx
import './App.css'
import { useState } from 'react';
import { useReplit } from '@replit/extensions/react';

function App() {
  const { status, error, replit } = useReplit(); // Establish the handshake with Replit
  
  const [fileName, setFileName] = useState(""); // File name
  const [fileValue, setFileValue] = useState(""); // File content
  
  // Create the file and send a confirmation message
  const createFile = async () => {
    await replit.fs.writeFile(fileName, fileValue); 
    await replit.messages.showConfirm("File Created");
  }

  return (
    <main>
      <div className="heading">File Creator</div>
      {status === "error" ? <div className="error">{error.message}</div> : null}
      {status === "loading" ? <div>Loading...</div> : null}
      {status === "ready" ?
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <input
            placeholder="File name"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
          />
          <textarea
            placeholder="File content"
            value={fileValue}
            onChange={e => setFileValue(e.target.value)}
            rows={5}
          />
          <button onClick={createFile}>Create File</button>
        </div> : null}
    </main>
  );
}

export default App;
```

## Developer Guide
### Repl

1. [Import this repository](https://replit.com/github/replit/extensions) onto Replit.
2. Configure the `.replit` file ([docs](https://docs.replit.com/programming-ide/configuring-repl)) to run the `dev` script in package.json (`npm run dev`).  This will build the project with esbuild and run a dev server which opens a webview.
3. Once built, you can publish the package with `npm publish`.  Make sure you increment the version.
4. Update the changelog when publishing.
5. Copy the URL from the webview and install it as an extension in your Repl.

### Local Development
1. Clone this repository with `git clone https://github.com/replit/extensions`.
2. Navigate into the folder with `cd extensions`.
3. Run `npm run dev` to build the package and run the development server.
4. Expose localhost to an ngrok link with `ngrok http <port>`.
5. Copy the https ngrok link and install that as an extension (note: some of the filesystem APIs won't behave correctly on localhost)

## Help
If you don't understand something in the documentation, have found a bug, or would like to request a feature, you can get support in our [discord server](https://discord.gg/replit-devs).