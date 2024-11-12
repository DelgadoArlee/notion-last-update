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

export function filterPagesByLastEdited(
  notionPages: NotionPageType[],
  days: number
): NotionPageType[] {
  const currentDate = new Date();
  const cutoffDate = new Date();
  cutoffDate.setDate(currentDate.getDate() - days);

  return notionPages.filter((page) => {
    const lastEditedDate = new Date(page.lastEditedAt);
    return lastEditedDate >= cutoffDate;
  });
}

export function filterDatabasesByLastEdited(
  notionDbs: NotionDbType[],
  days: number
): NotionDbType[] {
  const currentDate = new Date();
  const cutoffDate = new Date();
  cutoffDate.setDate(currentDate.getDate() - days);

  return notionDbs.filter((db) => {
    const recentPage = db.pages.some((page) => {
      const lastEditedDate = new Date(page.lastEditedAt);
      return lastEditedDate >= cutoffDate;
    });

    return recentPage;
  });
}
export function filterDBPagesByLastEdited(
  db: NotionDbType,
  days: number
): NotionDbType {
  const currentDate = new Date();
  const cutoffDate = new Date();
  cutoffDate.setDate(currentDate.getDate() - days);

  const filter = db.pages.filter((page) => {
    const lastEditedDate = new Date(page.lastEditedAt);
    return lastEditedDate >= cutoffDate;
  });

  const result: NotionDbType = {
    ...db,
    pages: filter,
  };

  return result;
}
export function filteredDBPagesbyPages(
  db: NotionDbType,
  days: number | null | undefined
): NotionDbType {
  const currentDate = new Date();
  const cutoffDate = new Date();

  if (days != null && days !== 0) {
    cutoffDate.setDate(currentDate.getDate() - days);
  }

  const filteredPages = db.pages.filter((page) => {
    const lastEditedDate = new Date(page.lastEditedAt);
    return days == null || days === 0 || lastEditedDate >= cutoffDate;
  });

  filteredPages.sort((a, b) => {
    const dateA = new Date(a.lastEditedAt).getTime();
    const dateB = new Date(b.lastEditedAt).getTime();
    return dateA - dateB;
  });

  // Return the original db object with the sorted pages
  return { ...db, pages: filteredPages };
}
