# create-react-template

> 一个轻量的 Webpack + React 项目生成器，内置 TypeScript 模板。

[English](./README.md)

## 特性

- React 19 和 React DOM 19
- Webpack 5 开发与生产构建
- 支持 TypeScript 和 TSX
- 可选 React Router 模板
- 可选 ESLint 和 Prettier 配置
- 通过简单 CLI 快速创建项目

## 模板

| 模板 | 说明 |
| --- | --- |
| `base` | 最基础的 React + TypeScript + Webpack 应用 |
| `react-router` | 带 React Router 的 React + TypeScript + Webpack 应用 |

## 安装

本地开发时可以在当前仓库中安装并链接：

```bash
npm install
npm link
```

链接完成后即可使用 CLI：

```bash
create-react-template
```

如果包已经发布到 npm，也可以这样使用：

```bash
npx creat-react-template-webpack my-app
```

## 使用方式

交互式创建项目：

```bash
create-react-template
```

通过参数创建项目：

```bash
create-react-template my-app --template base
```

在指定目录创建 React Router 项目：

```bash
create-react-template my-app --template react-router --dir ./examples
```

创建项目时同时带上 ESLint 和 Prettier 配置：

```bash
create-react-template my-app --template base --eslint true --prettier true
```

## CLI 参数

| 参数 | 说明 |
| --- | --- |
| `[projectName]` | 项目名称 |
| `-n, --name <projectName>` | 项目名称，作用同位置参数 |
| `-t, --template <template>` | 模板名称，例如 `base` 或 `react-router` |
| `-d, --dir <dir>` | 项目目录将创建到该路径下 |
| `--eslint <eslint>` | 传入 truthy 值时包含 ESLint 配置 |
| `--prettier <prettier>` | 传入 truthy 值时包含 Prettier 配置 |

## 生成项目后的命令

进入生成后的项目目录：

```bash
npm install
npm run dev
npm run build
```

如果创建时选择了 ESLint 或 Prettier，还可以使用：

```bash
npm run lint
npm run format
npm run format:check
```

## 项目结构

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

## 工作原理

CLI 会把选中的模板复制到目标项目目录，根据 `bin/_package.json` 生成新的 `package.json`，按需合并 ESLint、Prettier 或 React Router 的依赖和脚本，并将 `__replace__placeholder__name__` 占位符替换为新的项目名称。

## License

ISC
