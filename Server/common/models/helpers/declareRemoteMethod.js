const wrapError = require('../helpers/errors/wrapError');

module.exports = function(Model) {
    return function(methodName, handler, options) {
        Model.remoteMethod(methodName, options);
        Model[methodName] = async function(...args) {
            const parameters = combineArgumentsToObject(options.accepts, args);
            return handler(Model, parameters);
        };
    };
};

function combineArgumentsToObject(acceptsSpecification, args) {
    const result = {};

    acceptsSpecification.map(x => x.arg)
        .forEach((argName, index) => result[argName] = args[index]);

    return result;
}
