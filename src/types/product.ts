export interface IProduct {
  id: string;
  name: string;
}

export interface IProductFilters extends Partial<IProduct> {}
