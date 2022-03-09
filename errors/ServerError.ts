export class ServerError extends Error {
  public statusCode: number;

  constructor(message?) {
    super();
    this.statusCode = 502
    this.message = message || 'Internal Server Error'
  }
}
