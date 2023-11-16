import { generateUrlFile, importUrlFile } from "./common/util";
import { JSDOM } from "jsdom";

const IMPORT_FILE_NAME = "./original/bookmarks_latest.html";
const OUTPUT_DIR = "./bookmarks/";

(async () => {
  console.log("Converting html bookmark links to .url format files");

  const data = await importUrlFile(IMPORT_FILE_NAME);
  const aTagList = new JSDOM(data).window.document.getElementsByTagName("A");

  for (let i = 0; i < aTagList.length; i++) {
    const title = aTagList.item(i)?.textContent;
    const href = aTagList.item(i)?.getAttribute("href");

    var marks = ["\\", "/", ":", "*", "?", "<", ">", "|", " ", "　"];

    let sanitizedTitle = title ?? "";
    for (let i = 0; i < marks.length; i++) {
      sanitizedTitle = sanitizedTitle.replaceAll(marks[i], "_");
    }

    if (!href) console.error(`DOM error on ${title}`);
    await generateUrlFile(OUTPUT_DIR, `${sanitizedTitle}.url`, href ?? "");
  }
})();
