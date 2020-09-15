export class HttpError extends Error {
  code: number | string;
  message: string;

  constructor(code: number | string, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}
