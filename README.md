# Nest - React boilerplate

This is a basic boilerplate to quickly set up a web application **fully written in [TypeScript](https://www.typescriptlang.org/)** (^3.7.4) — optional chaining available!

You can learn more about each package in its respective README:

- [NestJS](https://nestjs.com/) (^7.0.0) for the **server**: [Go to the server package](./packages/server)

  > _« A progressive Node.js framework for building efficient, reliable and scalable server-side applications. »_

* [React + ReactDOM](https://reactjs.org/) (^16.8.0 / ^16.12.0) for the **client**: [Go to the client package](./packages/client)

  > _« A JavaScript library for building user interfaces »_

* [Webpack](https://webpack.js.org/) (^4.42.0): A versatile bundler for both the client and the server.

## How to adapt the boilerplate

To start using the boilerplate for your project, you should:

1. Change the main project's name, set in the root [`package.json`](./package.json)'s `name` field and in its `scripts` commands.

2. Change each package's name, set in its own `package.json`'s `name` field.

3. Update the `dependencies` of each package requiring one of the internal packages:

   - Server: [`package.json`](./packages/server/package.json)
   - Client: [`package.json`](./packages/client/package.json)

4. Change the client debug `LOGGER_PREFIX` which is set in the [`config.ts`](./packages/client/src/config.ts) file. For more information, see the client README section [Debug library](./packages/client#debug-library).

5. Adapt the [`packages/client/public`](./packages/client/public) folder to your project (with your icons, manifest, robots.txt files).

## Installation

1. Basic requirements to run the repository:

   - [Node.js](https://nodejs.org/en/): The recommended way is via [`nvm`](https://github.com/nvm-sh/nvm). You can then install the version used for this project:
     ```sh
     nvm install lts/erbium
     ```
   - [Yarn](https://classic.yarnpkg.com/): If you have `nvm` installed, you'd prefer to install `yarn` without the node dependency. To do so, the `bash` install is the easiest:
     ```sh
     curl -o- -L https://yarnpkg.com/install.sh | bash
     ```

   > This repository uses the [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) as a tool to manage the different packages.

2. Install dependencies with the classic:

   ```sh
   yarn install
   ```

   > This will install all package dependencies in a common `node_modules` folder at the root of the project using a single `yarn.lock` file to avoid conflicting dependencies. The internal dependencies will be replaced by symbolic links to the corresponding packages.

3. Finally, in order to have the "common" packages (`lib` and `domain`) built so they can be used by both the `server` and the `client`, run:

   ```sh
   yarn build:common
   ```

   Or if you want the common packages to be **watched for file changes**, you can run:

   ```sh
   yarn start:common
   ```

### Note about subsequent installations

When you want to add new dependencies to any of the packages, you can either:

- Run `yarn add <new-package1> <new-package2>` in the corresponding package folder.
- Or run `yarn workspace <YOUR_PACKAGE_NAME> add <new-package1> <new-package2>` from the root folder.

## Development & Builds

See each package's README to learn more about their development and build scripts:

- [Client](./packages/client/README.md)

- [server](./packages/server/README.md)

## Linting & development tools

While being as minimal as possible on the final bundle side, the boilerplate integrates very useful linting and development tools so you can get started as quickly and efficiently as possible:

- [EditorConfig](https://editorconfig.org/): _« helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. »_

  - Rules are set in the root [`.editorconfig`](./.editorconfig) file.

- [Prettier](https://prettier.io/) (^1.19.1): _« An opinionated code formatter »_ which _« saves you time and energy »_.

  - Rules are set in the root [`.prettierrc`](./.prettierrc) file.

- [ESLint](https://eslint.org/) (^6.8.0) with [TypeScript parser](https://github.com/typescript-eslint/typescript-eslint) (^2.23.0): _« Find and fix problems in your JavaScript code »_

  - Project rules are set in the root [`.eslintrc`](./.eslintrc) file.

  - As the client package requires specific React related rules, it has its own [`.eslintrc`](./packages/client/.eslintrc) file which extends the project one.

To see how to integrates these tools with your favourite IDE or text editor, you can see the CONTRIBUTING [Development tools](./CONTRIBUTING.md#development-tools) section.

Each package has its own

```sh
yarn lint
```

command to ensure that its source code is written according to the ESLint rules. The project itself also has a root `yarn lint` command to sequentially run it in each internal package.

## TypeScript import paths

As you can see in both the [server](./packages/server/tsconfig.json)'s and the [client](./packages/client/tsconfig.json)'s `tsconfig.json` files, both the `baseUrl` and `paths` properties are defined to help you avoid the cumbersome and error-prone `../../` import paths (amongst other options):

```json
// tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

This allows you to `import` any file from the **same package** with the `'~/path/to/file/'` notation, considering the `src` folder as the package's _home_ (i.e. `~`).

## Coding styles

See [CONTRIBUTING](./CONTRIBUTING.md#coding-styles).

## Docker images

This project comes with a `Dockerfile` for each package likely to be deployed. They are all based on the [alpine](https://alpinelinux.org/) project.

To build the corresponding Docker images, you can use the [build_and_push.sh](./scripts/build_and_push.sh) script by setting the `PACKAGE` and optionally the `VERSION` — defaults to `latest` — as environment variables or simply use the dedicated `yarn` commands (the `latest` version will be applied):

```sh
# To build and push the server
yarn build-push:server

# To build and push the client
yarn build-push:client
```

## Deployment

The shipped [`docker-compose.yml`](./docker-compose.yml) file is mainly for demonstration purposes and local testing.

In order to run the applications in a completely containerised environment, please refer to the [Docker documentation](https://docs.docker.com/).

## License

This project is licensed under the [GNU Lesser General Public License v3.0 or later](https://spdx.org/licenses/LGPL-3.0-or-later.html). You can learn more reading the [LICENSE](./LICENSE).

## Author

Paul Landázuri
