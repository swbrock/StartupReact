This is a [Next.js](https://nextjs.org/), [MUI v5](https://mui.com/) and [Typescript](https://github.com/microsoft/TypeScript) starter. You can use this to start your Next.js + MUI + Typescript development faster and easier.

## Getting Started

1. First download files.
2. (Optional) If you want, You can also change the project name to whatever your like and also add the project name in "package.json".
3. Run this command in the project directory to install dependencies:

```bash
npm i
# or
yarn
```

4. You can run dev server with the following command:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Generating Types

- Start the backend
- Edit the package.json file, replacing `<YOUR API HERE>` with the subpath of your API if it has not already been replaced.
- Run `npm run gentypes`

After completing these steps, your frontend application with use the same types as the backend.

Make sure to rerun `npm run gentypes` if there is a change in the API.

# When you deploy, create a new project within Sentry.

When you have created a new project in sentry it will give you a message similar to this. (You need to scroll down a bit to find it, its right above the button saying to take you to issues.)

```js
Configure the Sentry initialization:

Sentry.init({
  dsn: "<SOME DSN CODE HERE>",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
```

Copy the dsn value from the message, and paste it into the `dsn` field in the sentry.client.config.js and sentry.server.config.js files. Go ahead and replace the value that is there right now, it is a stub for the NextDab.
Once this is complete, Sentry will track the errors, and you can see the errors in the sentry dashboard under the correct project.
