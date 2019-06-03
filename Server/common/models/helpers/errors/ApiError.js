class ApiError extends Error {

    static validation(error) {
        return new ApiError(error.message, 400, error.errors);
    }

    static information(kind) {
        return ApiError.fieldValidation('common', kind);
    }

    static fieldValidation(field, kind) {
        return new ApiError('Bad Request', 400, {
            [field]: {kind}
        });
    }

    static internalServer() {
        return new ApiError('Internal Server Error', 500);
    }

    static forbiddenError() {

        return new ApiError('Forbidden', 403);
    }

    static unauthorizedError(reason = 'unknown') {
        return new ApiError('Unauthorized', 401, {reason});
    }

    static notFound() {
        return new ApiError('Not found', 404);
    }

    static cancel() {
        return new ApiError('Cancelled', 400);
    }

    constructor(message, code, details) {
        super(message);
        this.code = code;
        this.details = details;
    }
}

module.exports = ApiError;
