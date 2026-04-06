# Next-TP

一个基于 Next.js、Turborepo 和 pnpm 构建的现代 monorepo 模板。

[English](./README.md) | 简体中文

## 技术栈

- **框架**: [Next.js](https://nextjs.org/)
- **Monorepo**: [Turborepo](https://turbo.build/)
- **包管理器**: [pnpm](https://pnpm.io/)
- **UI 组件**: [Radix UI](https://www.radix-ui.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **代码检查**: [Biome](https://biomejs.dev/)
- **Storybook**: 组件文档和测试

## 项目结构

```text
next-tp/
├── apps/
│   ├── web/          # Next.js Web 应用
│   └── storybook/    # Storybook 组件文档
├── packages/
│   ├── ui/           # 共享 UI 组件库
│   └── tsconfig/     # 共享 TypeScript 配置
└── package.json
```

## 环境要求

- Node.js >= 22.x（推荐使用 [Volta](https://volta.sh/) 进行版本管理）
- pnpm >= 10.x

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

```bash
cp apps/web/.env.example apps/web/.env.local
```

编辑 `apps/web/.env.local` 并配置所需的环境变量。

### 3. 启动开发服务器

```bash
# 启动所有应用
pnpm dev

# 仅启动 web 应用
pnpm --filter=web dev

# 仅启动 storybook
pnpm --filter=storybook dev
```

### 4. 构建生产版本

```bash
pnpm build
```

## 可用脚本

| 命令                     | 描述                     |
| ------------------------ | ------------------------ |
| `pnpm dev`               | 以开发模式启动所有应用   |
| `pnpm build`             | 构建所有应用的生产版本   |
| `pnpm lint`              | 运行 Biome 代码检查      |
| `pnpm format`            | 使用 Biome 格式化代码    |
| `pnpm typecheck`         | 运行 TypeScript 类型检查 |
| `pnpm clean`             | 清理所有 node_modules    |

## 注意事项

1. **环境变量**：启动 web 应用前，请务必将 `.env.example` 复制为 `.env.local`。切勿将 `.env.local` 提交到版本控制。

2. **Playwright 浏览器**：首次运行 Storybook 测试时，需要安装 Playwright 浏览器：

   ```bash
   pnpm exec playwright install
   ```

3. **Node 版本**：本项目使用 Node.js 22.x。如果你使用 Volta，它会自动切换到正确的版本。

## 许可证

MIT
