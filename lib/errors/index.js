class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class ResourceNotFoundError extends HttpError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class MissingCredentialsError extends HttpError {
  constructor(message = "Missing Credentials") {
    super(message, 401);
  }
}

class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  ResourceNotFoundError,
  MissingCredentialsError,
  ForbiddenError,
};
