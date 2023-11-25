import { promises as fs } from "fs";

export async function importUrlFile(importFileName: string) {
  try {
    return await fs.readFile(importFileName, "utf8");
  } catch (error) {
    console.error(error);
  }
}

export async function generateUrlFile(
  outputDir: string,
  outputFileName: string,
  url: string,
) {
  try {
    const data = `[InternetShortcut]\nURL=${url}`;
    await fs.writeFile(outputDir + outputFileName, data);
  } catch (error) {
    console.error(error);
  }
}
