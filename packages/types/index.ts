export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string, public readonly errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
  }
}