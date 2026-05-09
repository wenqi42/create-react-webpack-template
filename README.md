# create-react-template

> A lightweight Webpack + React project generator with TypeScript templates.

[中文文档](./README.zh-CN.md)

## Features

- React 19 and React DOM 19
- Webpack 5 development and production builds
- TypeScript and TSX support
- Optional React Router template
- Optional ESLint and Prettier config files
- Simple CLI for creating a new project from a template

## Templates

| Template | Description |
| --- | --- |
| `base` | Minimal React + TypeScript + Webpack app |
| `react-router` | React + TypeScript + Webpack app with React Router |

## Installation

Install from this repository while developing locally:

```bash
npm install
npm link
```

After linking, the CLI is available as:

```bash
create-react-template
```

If the package is published, you can also use it with npm:

```bash
npx creat-react-template-webpack my-app
```

## Usage

Create a project interactively:

```bash
create-react-template
```

Create a project with arguments:

```bash
create-react-template my-app --template base
```

Create a React Router project in a target directory:

```bash
create-react-template my-app --template react-router --dir ./examples
```

Create a project with ESLint and Prettier files:

```bash
create-react-template my-app --template base --eslint true --prettier true
```

## CLI Options

| Option | Description |
| --- | --- |
| `[projectName]` | Project name |
| `-n, --name <projectName>` | Project name, same as the positional argument |
| `-t, --template <template>` | Template name, such as `base` or `react-router` |
| `-d, --dir <dir>` | Directory where the project folder will be created |
| `--eslint <eslint>` | Include ESLint config when truthy |
| `--prettier <prettier>` | Include Prettier config when truthy |

## Generated Project Commands

Inside the generated project:

```bash
npm install
npm run dev
npm run build
```

If ESLint or Prettier were selected:

```bash
npm run lint
npm run format
npm run format:check
```

## Project Structure

```text
.
├── bin/
│   ├── create-react-template.js
│   ├── template.config.json
│   └── _package.json
├── public/
├── template/
│   ├── base/
│   └── react-router/
├── webpack.config.js
├── tsconfig.json
└── package.json
```

## How It Works

The CLI copies the selected template into the target project directory, creates a `package.json` from `bin/_package.json`, merges optional dependencies and scripts, and replaces the `__replace__placeholder__name__` placeholder with the new project name.

## License

ISC
