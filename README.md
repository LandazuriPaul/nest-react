# Nest - React boilerplate

This is a basic boilerplate to quickly set up a web application **fully written in [TypeScript](https://www.typescriptlang.org/)** (^3.7.4).

> NOTE: Optional chaining is available :)

You can learn more about each package in its respective README:

- On the backend - go to the [API package](./packages/api):

  > [NestJS](https://nestjs.com/) (^7.0.0): _« A progressive Node.js framework for building efficient, reliable and scalable server-side applications. »_

- On the frontend - go to the [frontend package](./packages/frontend):

  > [React + ReactDOM](https://reactjs.org/) (^16.8.0 / ^16.12.0): _« A JavaScript library for building user interfaces »_

- [Webpack](https://webpack.js.org/) (^4.42.0): A versatile bundler for both the frontend and the API.

## How to adapt the boilerplate

To start using the boilerplate for your project, you should:

1. Change the main project's name, set in the root [`package.json`](./package.json)'s `name` field.

2. Change each package's name, set in its own `package.json`'s `name` field.

3. Update the `dependencies` of each package requiring one of the internal packages:

   - API: [`package.json`](./packages/api/package.json)
   - Frontend: [`package.json`](./packages/frontend/package.json)

4. Change the frontend debug `LOGGER_PREFIX` which is set in the [`config.ts`](./packages/frontend/src/config.ts) file.

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

   This will install all package dependencies in a common `node_modules` folder at the root of the project using a single `yarn.lock` file to avoid conflicting dependencies. The internal dependencies will be replaced by symbolic links to the corresponding packages.

3. Finally, in order to have the common packages (`lib` and `domain`) built so they can be used by both the `API` and the `frontend`, run:

   ```sh
   yarn compile
   ```

### Note about subsequent installations

When you want to add new dependencies to any of the packages, you can either:

- Run `yarn add <new-package1> <new-package2>` in the corresponding package folder.
- Or run `yarn workspace <YOUR_PACKAGE_NAME> add <new-package1> <new-package2>` from the root folder.

## Development & Builds

See each package's README to learn more about their development and build scripts:

- [Frontend](./packages/frontend/README.md)

- [API](./packages/api/README.md)

## Docker images

This project comes with a `Dockerfile` for each package likely to be deployed. They are all based on the [alpine](https://alpinelinux.org/) project.

To build the corresponding Docker images, you can use the [build_and_push.sh](./scripts/build_and_push.sh) script by setting the `PACKAGE` and optionally the `VERSION` — defaults to `latest` — as environment variables or simply use the dedicated `yarn` commands (the `latest` version will be applied):

```sh
# To build and push the API
yarn build-push:api

# To build and push the frontend
yarn build-push:frontend
```

## Deployment

The shipped [`docker-compose.yml`](./docker-compose.yml) file is mainly for demonstration purposes and local testing.

In order to run the applications in a completely containerised environment, please refer to the [Docker documentation](https://docs.docker.com/).

## License

This project is licensed under the [GNU Lesser General Public License v3.0 or later](https://spdx.org/licenses/LGPL-3.0-or-later.html). You can learn more reading the [LICENSE](./LICENSE).

## Author

Paul Landázuri
