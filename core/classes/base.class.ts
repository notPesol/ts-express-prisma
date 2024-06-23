export class Base {
  constructor(data?: Record<string, any>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
