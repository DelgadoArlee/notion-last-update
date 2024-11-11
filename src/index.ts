import "dotenv/config";
import { Client } from "@notionhq/client";
import { fetchNotionDbPages, getNotionDb } from "./api/notion";
import { getNotionDbTitle } from "./api/utils";

const notion: Client = new Client({ auth: process.env.NOTION_API_KEY });
const mainDbId: string | undefined = process.env.NOTION_DB_IDS;

const main = async (notion: Client) => {
  try {
    console.log("DbId:", mainDbId);
    if (mainDbId == undefined) {
      throw new Error("Notion Database ids must not be empty");
    }

    const notionDb = await getNotionDb(mainDbId, notion);
    const notionDbTitle = await getNotionDbTitle(notionDb);

    //   console.log(await getNotionDb(mainDbId, notion));
    console.log(`${notionDbTitle}:`);

    const notionDbPages = await fetchNotionDbPages(mainDbId, notion);

    console.log(notionDbPages);
  } catch (error) {
    console.log(error);
  }
};

main(notion);
