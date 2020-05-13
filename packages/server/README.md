# Nest React Server

## Configuration module

Following the [NestJS recommendation](https://docs.nestjs.com/techniques/configuration) for the server configuration, the server package comes with a convenient `ConfigModule` declared as a `@Global()` module so any other module can access it without needing to include it in its dependencies.

### Initialisation

This module adapts to both local `dotenv` files and container orchestration config volumes — e.g. [Kubernetes `config-volume`](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/). It follows the below logic to define the configuration variables, in order of priority:

1. If both `CONFIG_PATH` and `SECRETS_PATH` environment variables are defined, it will look for their corresponding values as folders and hydrate the configuration with their file content.

2. If the `NODE_ENV` environment variable is set, it will read both the usual configurations variables and the secrets from the corresponding `env/${NODE_ENV}.env` file. All the secrets need to be prefixed with the `SECRET_` string as per the `configSchema`.

3. If none of the above is provided, it will try to read the configuration and secret variables from the `env/local.env` file.

4. If none of the above is satisfied, the application will throw an uncaught error and crash.

### Validation

In order to be make sure that the application won't crash because of a misconfiguration once started, the configuration is entirely validated against the schema provided in the `ConfigService`'s `configSchema` private property thanks to the [@hapi/joi](https://hapi.dev/module/joi/) package.

### Usage in the app

As the `ConfigModule` is declared as `@Global()`, you don't need to include in the module's `imports` array to use it. Nevertheless, you'll need to include the `ConfigService` in the constructor arguments of any class using it. You can see an example in the [HelloService](./src/modules/hello/hello.service.ts).

In order to enforce type safety when using the configuration variables across the application source, you should always access them via getters. You can find examples of such typed getters at the end of the [`ConfigService`](./src/config/config.service.ts).

The only exception for this is in the [main's `bootstrap`](./src/main.ts) function which needs to get the configuration variables without having access to the `ConfigService` instance and which gets over the TS `private` restriction by calling the `envConfig` as a plain object.

## Running the app

By default, the server is listening to the [http://localhost:4000](http://localhost:4000) port. This behaviour can be configured via the [local.env](./env/local.env) file.

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

The powerful debug feature allows any Node.js debugger tool to connect to the running process in order to define breakpoints, log points, and more. Any Chromium based browser comes with the Node inspector feature built-in. To learn more about the Node.js debugging tools, the [Node.js documentation](https://nodejs.org/de/docs/guides/debugging-getting-started/) is a nice starting point.

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

The server package has a [Dockerfile](./Dockerfile) which builds a lightweight (based on the [alpine](https://alpinelinux.org/) project) production ready Docker image.

For more information about the Docker images, see the [main README.md](../../README.md#docker-images).
