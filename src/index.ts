import { program } from "commander";
import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";
import { generateUrlFile, importUrlFile } from "./common/util";

function initProgram() {
  program
    .description("Convert html bookmark links to .url format files.")
    .option("-i, --input <input>", "input file path", "./bookmarks.html")
    .option("-o, --output <output>", "output directory path", "./bookmarks/");

  program.parse();
  return program.opts<{
    input: string;
    output: string;
  }>();
}

export async function generate() {
  const options = initProgram();
  console.log("Converting html bookmark links to .url format files");

  const outputPath = path.join("./", options.output, "/");
  if (fs.existsSync(outputPath)) {
    throw new Error(
      "Output directory already exists. Please delete it manually.",
    );
  }
  await fs.promises.mkdir(outputPath);

  const data = new JSDOM(await importUrlFile(options.input));
  const aTagList = data.window.document.getElementsByTagName("A");

  for (let i = 0; i < aTagList.length; i++) {
    let title = aTagList.item(i)?.textContent ?? "";

    // replace specific characters with "_"
    ["\\", "/", ":", "*", "?", "<", ">", "|", " ", "　", "\"", "'", "`"].map(
      mark => (title = title.replaceAll(mark, "_")),
    );

    const href = aTagList.item(i)?.getAttribute("href");
    if (!href) console.error(`DOM error on ${title}`);
    await generateUrlFile(outputPath, `${title}.url`, href ?? "");
  }
}
