import { Base } from "./base.class";

export class Response<T> extends Base {
  data?: T;
  message?: string;
  totalItem?: number;
}
