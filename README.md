# Bookmark Links

This library genrates bookmark links with a extention of `.url` for Windows.
This may be useful if you want to open bookmark urls in [Powertoys Run](https://learn.microsoft.com/windows/powertoys/run).

Input bookmark file should be exported from [Brave](https://brave.com/) browser.
This may work with other Chromium-based browsers, but not tested.

## Initial setups

1. [Install node](https://nodejs.org/)

2. Install packages

npm

```bash
npm install @s-hirano-ist/bookmark-links
npm install -D ts-node
```

yarn

```bash
yarn add @s-hirano-ist/bookmark-links
yarn add --dev ts-node
```

pnpm

```bash
pnpm install @s-hirano-ist/bookmark-links
pnpm install -D ts-node
```

## How to use?

```bash
cat <<EOF > ./sample.ts
import { generate } from "@s-hirano-ist/bookmark-links";
generate();
EOF
```

```bash
pnpm ts-node sample.ts
```

```bash
pnpm ts-node sample.ts --input <input file path> --output <output directory path>
```

For more infomation, run the following command.

```bash
pnpm ts-node sample.ts --help
```

## Publish

```bash
npm adduser
```

```bash
npm version <major|minor|patch>
```

```bash
npm publish
```
