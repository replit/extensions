# Replit Extensions API Client

The Replit Extensions client is a module that allows you to easily interact with the Workspace

 - Repositories
  - https://github.com/replit/extensions
  - https://github.com/replit/extensions-react
 - NPM Packages
  - https://www.npmjs.com/package/@replit/extensions
  - https://www.npmjs.com/package/@replit/extensions-react
 - [Documentation](https://docs.replit.com/extensions)
  - [Resources](https://docs.replit.com/extensions/resources)
  - [API Modules](https://docs.replit.com/extensions/category/api-reference)
  - [React Client](https://docs.replit.com/extensions/category/react)
 - [Ask Forum](https://ask.replit.com/c/extensions)
 - [React Extension Template](https://replit.com/@replit/React-Extension?v=1)
 - [HTML/CSS/JS Extension Template](https://replit.com/@replit/HTMLCSSJS-Extension?v=1)

[![Run on Replit button](https://user-images.githubusercontent.com/50180265/228865994-ccf7348e-ffb7-454e-bc4e-ce90df6c09bc.png)](https://replit.com/github/replit/extensions)

## Installation

```
npm install @replit/extensions
yarn add @replit/extensions
pnpm add @replit/extensions
```

## Usage

1. Fork the [React Template](https://replit.com/@replit/React-Extension?v=1) on Replit and run the Repl
2. Use **cmd**/**ctrl** + K to open up the command bar
3. Hit **Manage extensions** > **Add an extension by URL**
4. In the sidebar, you should see your extension pop up under **Extensions Devtools**.  Click it to open it.
5. Hit each of the buttons in the output to confirm that the extension works.
6. Create a simple file creator extension:

```jsx
import './App.css'
import { useState } from 'react';
import { useReplit } from '@replit/extensions-react';

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

## Help
If you don't understand something in the documentation, have found a bug, or would like to request a feature, you can get help on the [Ask Forum](https://ask.replit.com/c/extensions).
