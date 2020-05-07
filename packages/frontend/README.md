# Nest React boilerplate frontend

## Running the app

By default, the webpack dev server is listening to the [http://localhost:8000](http://localhost:8000) port. This can be configured in the [webpack.config.js](./webpack.config.js) file, changing the `WEBPACK_DEV_SERVER_PORT` constant.

If your frontend imports assets (e.g. images), they will be passed as base64 inline HTML element if they are under `5000` bytes. Otherwise they will be passed as separated files in the final bundle. To change this limit, you can change the `ASSETS_MAX_INLINE_SIZE` constant. For more information about this, see the [`url-loader` documentation](https://webpack.js.org/loaders/url-loader).

### In development

```sh
# Runs the webpack dev server (using HMR)
yarn start:dev
```

#### Debug

> The powerful debug feature allows any Node.js debugger tool to connect to the running process in order to define breakpoints, log points, and more. Any Chromium based browser comes with the Node inspector feature built-in. To learn more about the Node.js debugging tools, the [Node.js documentation](https://nodejs.org/de/docs/guides/debugging-getting-started/) is a nice starting point.

If you use the VS Code IDE, this repository already ships 2 configurations to `launch` a Chrome debugging session or `attach` to an existing one. See the [.vscode/launch.json](../../.vscode/launch.json) file for more information.

### In production

Once you are happy with your code, you can run a production version following these steps:

1. Build a production bundle:

   ```sh
   yarn build
   ```

2. Then you can serve the `dist` folder from any webserver application like [NGINX](https://nginx.org/) for example. The [nginx.conf](./nginx.conf) can be used as an example of a working NGINX configuration.

### Docker image

The frontend package has a [Dockerfile](./Dockerfile) which builds a lightweight (based on the [alpine](https://alpinelinux.org/) project) production ready Docker image.

For more information about the Docker images, see the [main README.md](../../README.md).
