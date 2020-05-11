# Contributing to this Nest - React boilerplate

## Coding styles

As the TypeScript project doesn't issue an "official style guide", this boilerplate mostly follows the [Standard JavaScript rules](https://standardjs.com/rules.html) for generic JavaScript declaration, and the [TypeScript book StyleGuide and Coding Conventions](https://basarat.gitbook.io/typescript/styleguide) for TypeScript specific syntax.

As a quick summary, here are the main naming conventions:

- Use `camelCase` for **variable** and **function** names

- Use `PascalCase` for **class**, **interface**, **type** and **enum** names

On top of these simple rules, this repository uses **exclusively named** exports and avoids the default exports for many reasons which are very well summarised in [this blog post](https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/) from the `ESLint` author. For similar reasons and to enable tree-shaking when possible, the "import all" syntax is avoided, replacing ~~`import * as libName from "libName";`~~ by `import { libFunc, libObject } from "libName";`.

## File structure and naming

To ensure we can easily know what a file content is about, we enforce the following rules throughout the codebase:

- **React component** files are named after their main exported component. This is why they are the ONLY files using the `PascalCase` for naming. They also have the `.tsx` extension.

- Each **React component** lives in its own folder, right under the `packages/client/src/components` folder.

- **All other TS** files are named using the `camelCase` convention. On top of that, when a file defines a common type of object, the type is appended to the file name. For example, the `Dictionary` interface is defined in the `dictionary.interface.ts` file, and the `HelloController` class is defined in the `hello.controller.ts`.

## Development tools

### Editorconfig

Editorconfig easily integrates with [many text editors and IDEs](https://editorconfig.org/#download) — some natively, for example:

- VS Code: [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

- Vim / NeoVim: [EditorConfig plugin for Vim](https://github.com/editorconfig/editorconfig-vim)

- JetBrains IDEs: [EditorConfig plugin](https://plugins.jetbrains.com/plugin/7294-editorconfig)

### ESLint

ESLint easily integrates with [many text editors and IDEs](https://eslint.org/docs/user-guide/integrations), for example:

- VS Code: [ESLint for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- Vim / NeoVim:

  - [Ale](https://github.com/dense-analysis/ale)
  - [Syntastic](https://github.com/vim-syntastic/syntastic/tree/master/syntax_checkers/javascript)

- JetBrains IDEs: [ESLint plugin](https://plugins.jetbrains.com/plugin/7494-eslint)

### Prettier

Prettier easily integrates [many text editors and IDEs](https://prettier.io/), for example:

- VS Code: [Prettier for VS Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- Vim / NeoVim:

  - [Neoformat](https://github.com/sbdchd/neoformat)
  - [Ale](https://github.com/w0rp/ale)
  - [Vim Prettier](https://github.com/prettier/vim-prettier)

- JetBrains IDEs: built-in support

This boilerplate has a `.vscode` folder with the following setting to help us have a smooth experience with formatting:

```json
{
  "editor.formatOnSave": true
}
```

Other IDEs and text editors usually offer similar features to help you ensure that the code is automatically formatted the way Prettier expects.

### TypeScript

VS Code and WebStorm both fully support TypeScript natively. For [Vim / NeoVim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), here are some tools to help you with the syntax highlighting and syntax error detections, etc.:

- [TypeScript Syntax for Vim](https://github.com/leafgarland/typescript-vim): for syntax highlighting

- [Tsuquyomi](https://github.com/Quramy/tsuquyomi): For essential IDE features like: completion (omni-completion), navigation to the location where a symbol is defined, showing location(s) where a symbol is referenced, displaying a list of syntax and semantics errors to Vim quickfix window, etc.
