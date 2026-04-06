# Next-TP

A modern monorepo template built with Next.js, Turborepo, and pnpm.

English | [简体中文](./README.zh-CN.md)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Monorepo**: [Turborepo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Linting**: [Biome](https://biomejs.dev/)
- **Storybook**: Component documentation and testing

## Project Structure

```text
next-tp/
├── apps/
│   ├── web/          # Next.js web application
│   └── storybook/    # Storybook for component documentation
├── docs/             # Project-specific technical guides and conventions
├── packages/
│   ├── ui/           # Shared UI components
│   └── tsconfig/     # Shared TypeScript configurations
└── package.json
```

For working conventions and implementation guidance, start with `CLAUDE.md` and use `docs/` for deeper project-specific references.

## Prerequisites

- Node.js >= 22.x (recommended to use [Volta](https://volta.sh/) for version management)
- pnpm >= 10.x

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

```bash
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local` and configure the required environment variables.

### 3. Start development server

```bash
# Start all apps
pnpm dev

# Start only web app
pnpm --filter=web dev

# Start only storybook
pnpm --filter=storybook dev
```

### 4. Build for production

```bash
pnpm build
```

## Available Scripts

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `pnpm dev`               | Start all apps in development mode |
| `pnpm build`             | Build all apps for production      |
| `pnpm lint`              | Run Biome linter                   |
| `pnpm format`            | Format code with Biome             |
| `pnpm typecheck`         | Run TypeScript type checking       |
| `pnpm clean`             | Clean all node_modules             |

## Important Notes

1. **Environment Variables**: Always copy `.env.example` to `.env.local` before starting the web app. Never commit `.env.local` to version control.

2. **Playwright Browsers**: If running Storybook tests for the first time, you need to install Playwright browsers:

   ```bash
   pnpm exec playwright install
   ```

3. **Node Version**: This project uses Node.js 22.x. If you're using Volta, it will automatically switch to the correct version.

## License

MIT
