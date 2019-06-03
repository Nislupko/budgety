const _ = require('lodash');
const ApiError = require('./ApiError');

module.exports = function (error) {
    if (error instanceof ApiError)
        return error;

    if (error.constructor.name === 'ValidationError')
        return parseLoopbackError(error);

    if (error.statusCode)
        return parseLoopbackStatusError(error);

    if (error.errors)
        return ApiError.validation(error);

    console.error(error);
    return ApiError.internalServer();
};

function parseLoopbackError(error) {
    const codes = _.get(error, 'details.codes');
    if (!codes)
        return ApiError.information('validation-error');

    const field = _.keys(codes)[0];
    const kind = codes[field][0];

    return ApiError.fieldValidation(field, kind);
}

function parseLoopbackStatusError(error) {
    const kind = error.code || error.message;
    return new ApiError(error.code, error.statusCode, {common: {kind}});
}
