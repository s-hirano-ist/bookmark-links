# Bookmark Links

This script genrates bookmark links with a extention of `.url` for Windows.
This may be useful if you want to open bookmark urls in [Powertoys Run](https://learn.microsoft.com/windows/powertoys/run).

Input bookmark file should be exported from [Brave](https://brave.com/) browser.
This may work with other Chromium-based browsers, but not tested.

## Initial setups

1. [Install pnpm](https://pnpm.io/installation)

2. Install packages

```bash
pnpm i
```

## How to use?

```bash
pnpm run start
```

```bash
pnpm run start --input <input file path> --output <output directory path>
```

For more infomation, run the following command.

```bash
pnpm run start --help
```
