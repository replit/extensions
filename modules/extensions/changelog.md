## 1.2.0 - 1.5.0-beta.0

 - Experimenting with `exec` API.

## 1.1.2-beta.0

- Experimental `editor` API module

## 1.1.2

- No initial changes to client

## 1.3.0-beta.1

- Moved exec to experimental namespace

## 1.3.0-beta.0

- Basic exec api

## 1.1.0

- Wait for window to be ready before handshake

## 1.0.0

- Initial release

## 0.36.0

- Added `fs.watchDir`

## 0.35.0

- Some polish updates on the init function

## 0.34.0

- Added subscription status for users, and `iconUrl` + `imageUrl` to Repls (data module)
- Added the `useIsExtension` hook for the react module

## 0.33.1

- Added support for NodeJS module Resolution

## 0.33.0

- React Type Declarations work now!
- Exported status types for the `useReplit` and `useWatchTextFile` hook to `@replit/extensions/react`

## 0.32.0

- More stable and ergonomic file watcher, some breaking changes included
- No longer using `useLayoutEffect` in the `useReplitEffect` hook

## 0.31.0

- added the Themes API module

## 0.30.3

- added the `useActiveFile` React Hook

## 0.30.1

- added session.getActiveFile

## 0.30.0

- added session.onActiveFileChange

## 0.29.2

- Added the data module

## 0.28.2

- Updated the `useWatchTextFile` React hook

## 0.27.0

- Added messages API

## 0.26.0

- Added encoding option to readFile

## 0.25.0

- Removed layout

## 0.24.0

- Add useReplitEffect
- Fix useWatchTextFile
- Improve useReplit hook
- Fix issues with SSR
- Fix typing

## 0.24.0-test

- Fix types

## 0.23.0

- added themes API

## 0.21.0

- added useWatchTextFile() hook to @replit/extensions/react

## 0.20.0

- fixed global name bug for iife

## 0.19.0

- removed deprecated APIs

## 0.18.0

- Switched to tsup bundler
- made /example its own package, and improved how linking works
  - got rid of janky copy based linking
- improved devex for the replit/extensions package as a whole
- added @replit/extensions/react as an export
- added a useReplit hook

## 0.17.1

- upgraded json5

## 0.17.0

- fixed timeout
- bumped default timeout to 2000

## 0.16.0

- added `me` API
- added `me.filePath()` to get the current filePath

## 0.15.0

- Added activatePane call

## 0.13.0

- removed old postMessage code

## 0.12.0

- Added layout.getLayoutState, layout.setLayoutState
- Exported all types

## 0.11.0

- MIT license

## 0.10.0

- added replDb.delete API

## 0.9.0

- added fs.watchTextFile API

## 0.8.0

- addded typedocs, and reorganized replDb

## 0.7.4

- added some warnings for temporary APIs

## 0.7.3

- added typings

## 0.7.0

- added ESM support in addition to the current IIFE support

## 0.6.0

- added watchFile

## 0.5.0

- added layout
- fixed exports

## 0.4.0

- migrated to use comlink

## 0.0.2

- fixed build steps / cleanup

## 0.0.1

hi
