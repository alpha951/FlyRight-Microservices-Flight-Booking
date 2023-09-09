class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.explanation = message;
  }
}

module.exports = AppError;
