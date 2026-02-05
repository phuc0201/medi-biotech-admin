import type { IPagination } from "./paginate";

export interface IQueryParameter<T> {
  keyword?: string;
  search?: string;
  order?: string;
  pagination?: IPagination;
  filters?: T;
}
