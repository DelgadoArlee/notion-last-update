import { Client } from "@notionhq/client";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export const fetchNotionDb = async (dbId: string, notionClient: Client) => {
  const response = await notionClient.databases.retrieve({
    database_id: dbId,
  });

  return response;
};

export const fetchNotionDbPages = async (
  dbId: string,
  notionClient: Client
) => {
  const response = await notionClient.databases.query({
    database_id: dbId,
  });

  const results = response.results;

  return results;
};
