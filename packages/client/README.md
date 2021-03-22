# Nest React boilerplate client

## Client dependencies

As this boilerplate aims to be a minimal shell, it only ships 1 dependency on top of the React / ReactDOM pair and the internal dependencies: [Debug](https://github.com/visionmedia/debug) (^4.1.1).

### Debug library

This simple package allows you to log messages to the browser's console without using the synchronous and greedy `console`'s methods.

The boilerplate already ships a basic [`Logger`](./packages/client/src/utils/logger.ts) class which exposes basic static methods:

- `info`: for debug information
- `log`: alias for `info`
- `warn`: for warnings
- `error`: for error reporting. If you provide an instance of the `Error` type to this method's first argument, you will see its stack trace exposed in a similar way as the `console.error` would expose it. See the `useEffect` hook in the [`App`](./src/components/App/App.tsx) component for an example.

Once you have successfully adapted the boilerplate to your project, as explained in main README's section [How to adapt the boilerplate](../../README.md#how-to-adapt-the-boilerplate), to see the debug messages in your browser, you just need to set up the localstorage `debug` variable. To do so, run `localStorage.debug = '<LOGGER_PREFIX>:*'` in your browser console.

To learn more about the debug library usage in the browser, you can check out [its documentation](https://github.com/visionmedia/debug#browser-support).

### Styling options

Vite already comes with a complete set of [CSS support](https://vitejs.dev/guide/features.html#css).

## Running the app

By default, the webpack dev server is listening to the [http://localhost:8000](http://localhost:8000) port. This can be configured in the [vite.config.js](./vite.config.js) file, changing the `DEV_SERVER_PORT` constant.

### In development

```sh
# Runs the webpack dev server (using HMR)
yarn start:dev
```

As Vite is based on ESBuild for both JavaScript and TypeScript files, it doesn't do any type check. This has a number of advantages like a much faster response hot update and avoiding many useless disrupting errors occurring during prototyping while the types aren't completely respected yet. But the disadvantage is that the bundler won't detect any TypeScript error unless it is a JavaScript error.

To work around this limitation, the repository exposes a command to check your code is TypeScript compliant:

```sh
yarn check-types
```

#### Pre-bundling on macOS

When running for the first time in development mode, [Vite pre-bundles your dependencies](https://vitejs.dev/guide/dep-pre-bundling.html#dependency-pre-bundling). If you are running on macOS, you might see an error starting like this: `Error: ENFILE: file table overflow, scandir`. This is due to a limitation of concurrently opened files in recent macOS versions. Following [Dan MacTough's advice](http://blog.mact.me/2014/10/22/yosemite-upgrade-changes-open-file-limit), you can run the following to have this limit increased:

```sh
echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
ulimit -n 65536 65536
```

#### Debug

The powerful debug feature allows any Node.js debugger tool to connect to the running process in order to define breakpoints, log points, and more. Any Chromium based browser comes with the Node inspector feature built-in. To learn more about the Node.js debugging tools, the [Node.js documentation](https://nodejs.org/de/docs/guides/debugging-getting-started/) is a nice starting point.

If you use the VS Code IDE, this repository already ships 2 configurations to `launch` a Chrome debugging session or `attach` to an existing one. See the [.vscode/launch.json](../../.vscode/launch.json) file for more information.

### In production

Once you are happy with your code, you can run a production version following these steps:

1. Build a production bundle:

   ```sh
   yarn build
   ```

2. Then you can serve the `dist` folder from any webserver application like [NGINX](https://nginx.org/) for example. The [nginx.conf](./nginx.conf) can be used as an example of a working NGINX configuration.

In order to further customise the production bundling, you can check [Vite's documentation](https://vitejs.dev/config/#build-options). Since it uses [Rollup](https://rollupjs.org/guide/en/) under the hood, you are free to adapt every single part of the bundling process and use external Rollup plugins.

### Docker image

The client package has a [Dockerfile](./Dockerfile) which builds a lightweight (based on the [alpine](https://alpinelinux.org/) project) production ready Docker image.

For more information about the Docker images, see the [main README.md](../../README.md#docker-images).
