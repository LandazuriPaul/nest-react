# Nest - React boilerplate

This is a basic boilerplate to quickly set up a web application **fully written in [TypeScript](https://www.typescriptlang.org/)** (^3.7.4) based on:

- [NestJS](https://nestjs.com/) (^7.0.0) for the **server**: [> Go to the server package](./packages/server)

  > _« A progressive Node.js framework for building efficient, reliable and scalable server-side applications. »_

- [React + ReactDOM](https://reactjs.org/) (^16.8.0 / ^16.12.0) for the **client**: [> Go to the client package](./packages/client)

  > _« A JavaScript library for building user interfaces »_

- [Webpack](https://webpack.js.org/) (^4.42.0): A versatile bundler for both the client and the server.

## Features

While being minimalistic, this boilerplate offers a number of features which can be very valuable for the Development Experience (DX):

### Global

- Makes use of the [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to centralise the package management system for all the internal packages.

- TypeScript 3.7 which comes with, for example, **optional chaining** and customised [import paths](#typescript-import-paths) already defined for each package.

- EditorConfig + Prettier for [code formatting](#code-formatting).

- Full ESLint configurations for [linting](#linting).

- Consistent coding style following the standards. See [CONTRIBUTING](./CONTRIBUTING.md#coding-styles).

- Development scripts: `yarn start:dev` can be run in any package. See [Development & builds](#development--builds) for more information.

### Client

- The Webpack's [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) combined with the React [Fast Refresh](https://github.com/facebook/react/tree/master/packages/react-refresh) feature thanks to the [React Refresh Webpack Plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) offers an incredibly fast development process. When you edit and save a source file, it will only reload the corresponding module in the development server AND only **re-render the depending components without losing their state**!

- Debugger tool so you can avoid using the native but synchronous and greed `console`'s methods. For more information, see the client README section about the [Debug library](./packages/client#debug-library).

- Production ready [NGINX](https://nginx.org/) configuration example to optimise your frontend file delivery.

- Production ready [Dockerfile](#docker-images).

### Server

- NestJS basic package with all the Nest tools. See the [server README](./packages/server/) for more information.

- A predefined **global config module** to handle all the configuration you would like to pass to your server at runtime. You can lean more in the server's README [Configuration module](./packages/server/README.md#configuration-module) section.

- Production ready [Dockerfile](#docker-images).

---

## How to use this boilerplate

First, you'll need to download and adapt it to your project:

1. You can use the [Use this template](https://github.com/LandazuriPaul/nest-react/generate) feature from GitHub to generate a new project based on this boilerplate. Alternatively, you can clone this repository to a brand new folder named after your `new-project`:

   ```sh
   git clone git@github.com:LandazuriPaul/nest-react.git new-project
   ```

> For steps 2 to 5, a global `search in all files` command from any decent editor should help. You can simply search for `nest-react` and replace it by your `new-project`.

2. Change the main project's name, set in the root [`package.json`](./package.json)'s `name` field and in its `scripts` commands.

3. Change each package's name, set in its own `package.json`'s `name` field.

4. Update the `dependencies` of each package requiring one of the internal packages:

   - Server: [`package.json`](./packages/server/package.json)
   - Client: [`package.json`](./packages/client/package.json)

5. Change the client debug `LOGGER_PREFIX` which is set in the [`config.ts`](./packages/client/src/config.ts) file. For more information, see the client README section about the [Debug library](./packages/client#debug-library).

6. Adapt the [`packages/client/public`](./packages/client/public) folder to your project (with your icons, manifest, robots.txt files).

### Project installation

Once you're done with the previous steps, you can properly install the project dependencies and link the packages together:

1. Basic requirements to run the repository:

   - [Node.js](https://nodejs.org/en/): The recommended way is via [`nvm`](https://github.com/nvm-sh/nvm). You can then install the version used for this project:
     ```sh
     nvm install lts/erbium
     ```
   - [Yarn](https://classic.yarnpkg.com/): If you have `nvm` installed, you'd prefer to install `yarn` without the node dependency. To do so, the `bash` install is the easiest:
     ```sh
     curl -o- -L https://yarnpkg.com/install.sh | bash
     ```

   > As the boilerplate makes use of the yarn workspaces, you shouldn't use `npm`.

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

#### Note about subsequent installations

When you want to add new dependencies to any of the packages, you can either:

- Run `yarn add <new-package1> <new-package2>` in the corresponding package folder.
- Or run `yarn workspace <YOUR_PACKAGE_NAME> add <new-package1> <new-package2>` from the root folder.

### Development & Builds

See each package's README to learn more about its development and build scripts:

- [Client](./packages/client/README.md)

- [Server](./packages/server/README.md)

---

## Code formatting

- [EditorConfig](https://editorconfig.org/): _« helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. »_

  - Rules are set in the root [`.editorconfig`](./.editorconfig) file.

- [Prettier](https://prettier.io/) (^1.19.1): _« An opinionated code formatter »_ which _« saves you time and energy »_.

  - Rules are set in the root [`.prettierrc`](./.prettierrc) file.

## Linting

[ESLint](https://eslint.org/) (^6.8.0) with [TypeScript parser](https://github.com/typescript-eslint/typescript-eslint) (^2.23.0): _« Find and fix problems in your JavaScript code »_

- Project rules are set in the root [`.eslintrc`](./.eslintrc) file.

- As the client package requires specific React related rules, it has its own [`.eslintrc`](./packages/client/.eslintrc) file which extends the project one.

To see how to integrates these tools with your favourite IDE or text editor, you can see the CONTRIBUTING [Development tools](./CONTRIBUTING.md#development-tools) section.

Each package has its own

```sh
yarn lint
```

command to ensure that its source code is written according to the ESLint rules. The project itself also has a root `yarn lint` command to sequentially run it in each internal package.

## TypeScript import paths

As you can see in all packages' `tsconfig.json` files, both the `baseUrl` and `paths` properties are defined to help you avoid the cumbersome and error-prone `../../` import paths (amongst other options):

```json
// packages' tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "dist",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

This allows you to `import` any file from the **same package** with the `'~/path/to/file/'` notation, considering the `src` folder as the package's _home_ (i.e. `~`).

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

## Improvements

-- TODO: Add an automated script to run installation steps 2 to 5.

-- TODO: In `build_and_push.sh`, read the version from the corresponding package.json

-- TODO: Upgrade to TypeScript v3.9

## License

This project is licensed under the [GNU Lesser General Public License v3.0 or later](https://spdx.org/licenses/LGPL-3.0-or-later.html). You can learn more reading the [LICENSE](./LICENSE).

## Author

Paul Landázuri
