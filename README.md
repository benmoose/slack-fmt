# Slack Fmt

> Note: Fmt on Slack directory is [v0.0.1](https://github.com/benjaminhadfield/slack-fmt/tree/v0.0.1), [view on Slack](https://moosesandbox.slack.com/apps/A9QSW4XSB-fmt?page=1)
or [install](https://16el4ez0sg.execute-api.eu-west-2.amazonaws.com/dev/oauth/direct-install) to your workspace

**Fmt** is a helpful Slack bot for formatting JSON messages 🙃

### Usage

With Docker installed, run
```bash
$ docker-compose up
```

Otherwise, run
```bash
$ npm install
```

Then, in one terminal watch for TypeScript changes
```bash
$ npm run tsc:watch
```

Whilst running the server in another (ensure `NODE_ENV` is set to development)
```bash
$ npm start
```

### Tests

#### Running once

The test suite can be run with
```bash
$ docker-compose run server npm run test
```

Or without Docker
```bash
$ npm run test
```

#### Running in watch mode

To run tests in watch mode you need to compile the TypeScript codebase on each change and run
the test suite in watch mode. For those with Docker this functionality can be achieved by
running
```bash
$ scripts/run-tests.sh
```

For those without Docker, open two terminals and run
```bash
>> Terminal 1
$ npm run tsc:watch
```
```bash
>> Terminal 2
$ npm run test:watch
```
