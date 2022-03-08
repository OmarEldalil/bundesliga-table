export class ValidationError extends Error {
  public statusCode: number;

  constructor(message) {
    super();
    this.statusCode = 400
    this.message = message
  }
}
