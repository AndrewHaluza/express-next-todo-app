export type Pagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

export type Page = "task-list" | "task-detail";
