import { notionPages, notionDbs } from "./data";

export function sortDBPages(notionDbs: NotionDbType[]): void {
  notionDbs.forEach((db) => {
    db.pages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  });
}

export function sortDatabases(notionDb: NotionDbType[]) {
  notionDb.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function sortNotionPages(notionPages: NotionPageType[]) {
  notionPages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function sortAllNotionData() {
  sortDBPages(notionDbs);
  sortDatabases(notionDbs);
  sortNotionPages(notionPages);
}
