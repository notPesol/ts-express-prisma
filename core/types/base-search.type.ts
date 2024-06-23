export interface IBaseSearch {
  query?: string;
  page?: number;
  limit?: number;
  ignorePage?: boolean;
  count?: boolean;
  orderBy?: string;
  orderType?: string;
}
