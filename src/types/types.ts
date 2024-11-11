type NotionParentType = {
  type: string;
  id: string;
};

type NotionPageType = {
  id: string;
  createdAt: string;
  lastEditedAt: string;
  createdBy: string;
  lastEditedBy: string;
  parent: NotionParentType;
  url: string;
};

type NotionDbType = {
  id: string;
  title: string;
  pages: NotionPageType[];
};
