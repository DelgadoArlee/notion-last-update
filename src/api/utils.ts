import {
  PageObjectResponse,
  DatabaseObjectResponse,
  GetDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const getNotionId = (
  notionObject: PageObjectResponse | DatabaseObjectResponse
) => {
  const id = notionObject.id;

  return { id };
};

export const getNotionDbTitle = async (db: GetDatabaseResponse) => {
  if (db.title.length == 0) {
    throw new Error("Database must have at least one title");
  }

  const title = db.title.slice(0)[0];

  if (title == undefined) {
    throw new Error("Database must have title");
  }

  return title.text.content;
};

export const getNotionPageCreatedAt = (page: PageObjectResponse) => {
  const createdAt = page.created_time;

  return { createdAt };
};

export const getNotionPageLastEditedAt = (page: PageObjectResponse) => {
  const lastEditedAt = page.last_edited_by;

  return { lastEditedAt };
};

export const getNotionPageCreatedBy = (page: PageObjectResponse) => {
  const createdBy = page.created_by.id;

  return { createdBy };
};

export const getNotionPageLastEditedBy = (page: PageObjectResponse) => {
  const lastEditedBy = page.last_edited_by.id;

  return { lastEditedBy };
};

export const getNotionPageParent = (page: PageObjectResponse) => {
  const parent = page.parent;

  return { parent };
};

export const getNotionPageUrl = (page: PageObjectResponse) => {
  const url = page.url;

  return { url };
};

export const getNotionPageSummary = (page: PageObjectResponse) => {
  return {
    id: getNotionId(page),
    createdAt: getNotionPageCreatedAt(page),
    lastEditedAt: getNotionPageLastEditedAt(page),
    createdBy: getNotionPageCreatedBy(page),
    lastEditedBy: getNotionPageLastEditedBy(page),
    parent: getNotionPageParent(page),
    url: getNotionPageUrl(page),
  };
};

// export const getNotionDb = (db: DatabaseObjectResponse) => {

// }
