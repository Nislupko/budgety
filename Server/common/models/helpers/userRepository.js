const app = require('../../../server/server');
const ApiError = require('../helpers/errors/ApiError');

module.exports = {
    findWithLogin,
    findByEmail
};

async function findWithLogin(login) {
    return await app.models.BaseUser.findOne({
        where: {
            or: [
                {login}, {email: login}
            ],
        },
    });
}

async function findByEmail(email) {
    return await app.models.BaseUser.findOne({
        where: {
            or: [
                {email}
            ],
        },
    });
}
