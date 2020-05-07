# Nest - React boilerplate

This is a basic boilerplate to quickly set up a web application **fully written in [TypeScript](https://www.typescriptlang.org/)** using the following technologies:

- On the frontend:

  - [React](https://reactjs.org/): ^16.8.0

- On the backend (API):

  - [NestJS](https://nestjs.com/): ^7.0.0

- [Webpack](https://webpack.js.org/) (^4.42.0) to bundle both the frontend and the API.

You can learn more about each application in their respective folder and README:

- [Frontend](./packages/frontend)

- [API](./packages/api)

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

   This will install all package dependencies in a common `node_modules` folder at the root of the project using a single `yarn.lock` file to avoid conflicting package dependencies.

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

This project is licensed under the [GNU GENERAL PUBLIC LICENSE Version 3](https://www.gnu.org/licenses/gpl-3.0.en.html). You can learn more reading the [LICENSE](./LICENSE).

## Author

Paul Landázuri
