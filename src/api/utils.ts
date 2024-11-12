import {
  PageObjectResponse,
  DatabaseObjectResponse,
  GetDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const getNotionId = (
  notionObject: PageObjectResponse | DatabaseObjectResponse
) => {
  const id = notionObject.id;

  return id;
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

export const getNotionPageCreatedAt = (
  page: PageObjectResponse | DatabaseObjectResponse
) => {
  const createdAt = page.created_time;

  return createdAt;
};

export const getNotionPageLastEditedAt = (
  page: PageObjectResponse | DatabaseObjectResponse
) => {
  const lastEditedAt = page.last_edited_time;

  return lastEditedAt;
};

export const getNotionPageCreatedBy = (
  page: PageObjectResponse | DatabaseObjectResponse
) => {
  const createdBy = page.created_by.id;

  return createdBy;
};

export const getNotionPageLastEditedBy = (
  page: PageObjectResponse | DatabaseObjectResponse
) => {
  const lastEditedBy = page.last_edited_by.id;

  return lastEditedBy;
};

export const getNotionPageParent = (
  page: PageObjectResponse | DatabaseObjectResponse
) => {
  const parent = page.parent;

  return { type: parent.type, id: page.id };
};

export const getNotionPageUrl = (
  page: PageObjectResponse | DatabaseObjectResponse
) => {
  const url = page.url;

  return url;
};

export const getNotionPageType = (
  notionObject: PageObjectResponse | DatabaseObjectResponse
) => {
  return {
    id: getNotionId(notionObject),
    createdAt: getNotionPageCreatedAt(notionObject),
    lastEditedAt: getNotionPageLastEditedAt(notionObject),
    createdBy: getNotionPageCreatedBy(notionObject),
    lastEditedBy: getNotionPageLastEditedBy(notionObject),
    parent: getNotionPageParent(notionObject),
    url: getNotionPageUrl(notionObject),
  };
};

export const getNotionDbPages = (pages: PageObjectResponse[]) =>
  pages.map(getNotionPageType);

export const getNotionDbType =
  (pages: PageObjectResponse[]) => async (db: DatabaseObjectResponse) => {
    const notionPages = getNotionDbPages(pages) as NotionPageType[];

    const notionDbType: NotionDbType = {
      ...getNotionPageType(db),
      title: await getNotionDbTitle(db),
      pages: notionPages,
    };

    return notionDbType;
  };
