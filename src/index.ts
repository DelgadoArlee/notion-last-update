import "dotenv/config";
import { Client } from "@notionhq/client";
import { fetchNotionDbPages, fetchNotionDb } from "./api/notion";
import { getNotionDbType } from "./api/utils";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { filterDBPagesByLastEdited, filterPagesByLastEdited } from "./utils";

const notion: Client = new Client({ auth: process.env.NOTION_API_KEY });
const mainDbId: string | undefined = process.env.NOTION_DB_IDS;

const main = async (notion: Client) => {
  try {
    console.log("DbId:", mainDbId);
    if (mainDbId == undefined) {
      throw new Error("Notion Database ids must not be empty");
    }

    const notionDb = (await fetchNotionDb(
      mainDbId,
      notion
    )) as DatabaseObjectResponse;

    const notionDbPages = (await fetchNotionDbPages(
      mainDbId,
      notion
    )) as PageObjectResponse[];

    const database = await getNotionDbType(notionDbPages)(notionDb);
  } catch (error) {
    console.log(error);
  }
};

main(notion);
