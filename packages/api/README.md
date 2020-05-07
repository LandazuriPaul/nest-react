# Nest React API

## Running the app

By default, the API is listening to the [http://localhost:4000](http://localhost:4000) port. This behaviour can be configured via the [local.env](./env/local.env) file which is a basic `dotenv` configuration file, following the [NestJS recommendation](https://docs.nestjs.com/techniques/configuration) for the API configuration.

### In development

To run the development server locally, you can use the bellow commands:

```sh
# Runs the current version of the server
yarn start

# Runs the current version of the server
# + watches for file changes
yarn start:dev

# Runs the current version of the server
# + watches for file changes
# + opens a debugger connection (default port 9229)
yarn start:debug
```

#### Debug

> The powerful debug feature allows any Node.js debugger tool to connect to the running process in order to define breakpoints, log points, and more. Any Chromium based browser comes with the Node inspector feature built-in. To learn more about the Node.js debugging tools, the [Node.js documentation](https://nodejs.org/de/docs/guides/debugging-getting-started/) is a nice starting point.

If you use the VS Code IDE, this repository already ships a configuration to `attach` a debugger to the running application. See the [.vscode/launch.json](../../.vscode/launch.json) file for more information.

### In production

Once you are happy with your code, you can run a production version following these steps:

1. Build a production bundle into a brand new `dist` folder:

   ```sh
   yarn build
   ```

2. Run the production bundle:

   ```sh
   yarn start:prod
   ```

## Test

Nest comes with `Jest` and `Supertest` testing frameworks to ease the testing process. Here are the different test scripts which you can run:

```sh
# Runs the unit tests
yarn test

# Runs the unit test
# + watches for file changes
yarn test:watch

# Runs the end-to-end tests
yarn test:e2e

# Describes the test coverage
yarn test:cov
```

## Docker image

The API package has a [Dockerfile](./Dockerfile) which builds a lightweight (based on the [alpine](https://alpinelinux.org/) project) production ready Docker image.

For more information about the Docker images, see the [main README.md](../../README.md).
