# Dev guide

## Building

- the .replit file configures the run button to build the project with esbuild. (it then also starts a dev server which opens a webview)
- once built, it can be published with `npm publish`. Make sure to increment the version.
- update the changelog when publishing

# Repl

The 'Run' button opens a webview. That webview is a React/Vite repl which loads the bundled client library ready for you to use.

You can copy that webview URL, and add it to your repl as an extension, and it will connect with the workspace automatically

This works even better in dev, you can hot-reload repl-it-web, the client library, and the example extension all at once to test the full flow!
