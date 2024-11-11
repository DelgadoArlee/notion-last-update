import { notionPages, notionDbs } from "./data";

export function sortDBPages() {
  notionDbs.forEach((db) => {
    db.pages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  });
}

export function sortDatabases() {
  notionDbs.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function sortNotionPages() {
  notionPages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function sortAllNotionData() {
  sortDBPages();
  sortDatabases();
  sortNotionPages();
}
