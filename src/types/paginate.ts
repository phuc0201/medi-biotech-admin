export interface IPagination {
  current?: number;
  pageSize?: number;
}

export interface IPagedResults<T> {
  success: boolean;
  data: T[];
  meta: {
    page?: number;
    pageSize?: number;
    totalItems?: number;
    totalPages?: number;
    timestamp: string;
    path: string;
  };
}
