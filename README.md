# Replit Extensions Monorepo (All Clients)

A monorepo containing all NPM packages related to Replit Extensions.

- NPM Packages
  - [Default API Client](https://www.npmjs.com/package/@replit/extensions)
  - [React API Client](https://www.npmjs.com/package/@replit/extensions-react)
- [Repository](https://github.com/replit/extensions)
- [Documentation](https://docs.replit.com/extensions)
  - [API Modules](https://docs.replit.com/extensions/category/api-reference)
  - [React Client](https://docs.replit.com/extensions/category/react)
- [Discourse Category](https://ask.replit.com/c/extensions)
- [React Extension Template](https://replit.com/@replit/React-Extension?v=1)
- [HTML/CSS/JS Extension Template](https://replit.com/@replit/HTMLCSSJS-Extension?v=1)

## Getting Started

1. Clone this repository
2. Run `pnpm install`
3. Run `pnpm dev`, or simply hit the Run button if you've imported this into Replit.

You can edit either the default Extensions client or the React client and test your changes in `modules/example`.

## Developing the Extensions Client

The default Extensions client can be located within `modules/extensions`. To preview your changes in the development environment, run `pnpm build:extensions` in the shell or simply restart the development server.

## Developing the React Client

The React Extensions client can be located within `modules/extensions-react`. To preview your changes in the development environment, run `pnpm build:react` in the shell or simply restart the development server.
