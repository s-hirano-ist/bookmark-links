import { generateUrlFile, importUrlFile } from "./common/util";
import { JSDOM } from "jsdom";
import { program } from "commander";
import path from "path";
import fs from "fs";

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

(async () => {
  const options = initProgram();
  console.log("Converting html bookmark links to .url format files");

  const data = await importUrlFile(options.input);
  const aTagList = new JSDOM(data).window.document.getElementsByTagName("A");

  const outputPath = path.join("./", options.output, "/");
  if (fs.existsSync(outputPath))
    throw new Error(
      "Output directory already exists. Please delete it manually.",
    );
  await fs.promises.mkdir(outputPath);

  for (let i = 0; i < aTagList.length; i++) {
    let title = aTagList.item(i)?.textContent ?? "";

    // replace specific characters with "_"
    ["\\", "/", ":", "*", "?", "<", ">", "|", " ", "　"].map(
      mark => (title = title.replaceAll(mark, "_")),
    );

    const href = aTagList.item(i)?.getAttribute("href");
    if (!href) console.error(`DOM error on ${title}`);
    await generateUrlFile(outputPath, `${title}.url`, href ?? "");
  }
})();
