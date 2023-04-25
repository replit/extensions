# Contributing to `@replit/extensions`

We appreciate your interest in contributing to our project! As a team, we believe in the power of community-driven development and the potential of collaborative open-source projects to create and foster innovation.

## Getting Started

1. Fork the [repository](https://github.com/replit/extensions) by clicking the "Fork" button in the top-right corner of the page.
2. Clone your forked repository to your local machine using `git clone https://github.com/replit/extensions.git`.
3. Navigate into the repository with `cd extensions`.
4. Create a new branch for your feature, bug fix, or enhancement: `git checkout -b your-branch-name`.
5. Make your changes to the codebase.
6. Add and commit your changes using clear and concise commit messages: `git add .`, `git commit -m "Description of your changes"`.
7. Push your changes to your forked repository: `git push -u origin your-branch-name`.
8. Create a pull request from your forked repository to the original repository. Provide a descriptive title and comments explaining your proposed changes.

## Developer Guide

1. [Import this repository](https://replit.com/github/replit/extensions) on Replit.  Make sure you select Typescript as the language.
2. Install packages by running `npm install` in the shell
3. Run `git reset --hard origin/main` in the shell
4. Run the Repl
5. Open the Extension Devtools and hit "Open" on the first Tool listed.
6. Edit the example extension to ensure that your new implementation works.  To reload the code in the npm package, stop and restart the Repl.

## Checklist

1. Ensure that your code does not have any syntax or compiler errors.  You can check this by running `tsc --noEmit` in the shell.
2. Make sure everything is formatted properly with `npm run lint`.
3. Provide a test plan for anything you've modified so we can test it out and make sure it works.

## Requesting Features or Enhancements

We encourage suggestions to improve our project. If you have an idea for a new feature or enhancement, please create a post on the [Ask Forum](https://ask.replit.com) in the [relevant category](https://ask.replit.com/c/extensions).