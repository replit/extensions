# Replit Extensions API Client (React)

The React Extensions API Client comes with a set of hooks and components that combine to make a blazingly fast and seamless developer experience.

- NPM Packages
  - https://www.npmjs.com/package/@replit/extensions
  - https://www.npmjs.com/package/@replit/extensions-react
- [Repository](https://github.com/replit/extensions)
- [Documentation](https://docs.replit.com/extensions)
  - [Resources](https://docs.replit.com/extensions/resources)
  - [API Modules](https://docs.replit.com/extensions/category/api-reference)
  - [React Client](https://docs.replit.com/extensions/category/react)
- [Discourse Category](https://ask.replit.com/c/extensions)
- [React Extension Template](https://replit.com/@replit/React-Extension?v=1)
- [HTML/CSS/JS Extension Template](https://replit.com/@replit/HTMLCSSJS-Extension?v=1)

## Installation

```
npm install @replit/extensions-react
yarn add @replit/extensions-react
pnpm add @replit/extensions-react
```

## Usage

Fork the [React Extension Template](https://replit.com/@replit/React-Extension?v=1) to get started. Alternatively, you can start from scratch by wrapping your application with the `HandshakeProvider` component imported from `@replit/extensions-react`.

```tsx
import { HandshakeProvider } from "@replit/extensions-react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <HandshakeProvider>
    <App />
  </HandshakeProvider>
);
```

In the `App` function, check the handshake status with the `useReplit` hook.

```tsx
import { useReplit } from "@replit/extensions-react";

function App() {
  const { status, error, replit } = useReplit();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>An error occurred: {error?.message}</div>;
  }

  return <div>Extension is Ready!</div>;
}
```

## Help

If you don't understand something in the documentation, have found a bug, or would like to request a feature, you can get help on the [Ask Forum](https://ask.replit.com/c/extensions).
