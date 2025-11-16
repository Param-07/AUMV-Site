class AppError(Exception):
    """Base class for custom app errors."""
    status_code = 400

    def __init__(self, message, status_code=None):
        super().__init__(message)
        if status_code:
            self.status_code = status_code
        self.message = message


class DatabaseError(AppError):
    """Database-related errors."""
    status_code = 500


class NotFoundError(AppError):
    """Resource not found."""
    status_code = 404


class ValidationError(AppError):
    """Invalid input."""
    status_code = 422
