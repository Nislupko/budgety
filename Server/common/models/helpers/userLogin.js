const app = require('../../../server/server');
const ApiError = require('../helpers/errors/ApiError');
const userRepository = require('./userRepository');
const authTokenCookie = require('./authTokenCookie');


module.exports = {
    loginUser,
    loginWithToken,
    logoutUser,
    loginUserAfterRegistration,
    updatePassword
};

async function loginUser(BaseUser, {login, password, res}) {
    const userLogin = login.login;
    const baseUser = await userRepository.findWithLogin(userLogin);
    if (!baseUser) {
        throw ApiError.fieldValidation('user', 'doesnt-exist');
    }
    const result = {login: baseUser.login, id: baseUser.id};
    return {result: result, status:'success'};
}

async function loginUserAfterRegistration(baseUser, res) {
    try {
      const accessToken = await baseUser.createAccessToken();
      const user = await fetchUser(baseUser);

      authTokenCookie.set(res, accessToken.id);

      return {user};
    } catch (error) {
      console.error(error);
      throw ApiError.fieldValidation('user', 'forbidden');
    }
}

async function fetchUser(baseUser) {
  const concreteUser = await baseUser.get();
  return {...concreteUser};
}


async function authenticateUserByPassword(user, password) {
  console.log(user,password);
    const loginResult = await app.models.BaseUser.login({
        email: user.email,
        password
    });
    console.log(loginResult);
    return loginResult;
}


async function loginWithToken(BaseUser, {req}) {
    const baseUser = await req.accessToken.user.get();
    const user = await fetchUser(baseUser);

    return {user};
}

async function logoutUser(BaseUser, {req, res}) {
    if (req.accessToken) {
        await req.accessToken.destroy();
    }
    authTokenCookie.clear(res);
}

async function updatePassword(baseUser, data) {
    const {fields: {userId, oldPassword, newPassword, email}} = data;
    try {
        await baseUser.changePassword(userId, oldPassword, newPassword);
        const user = await userRepository.findByEmail(email);
        return await loginUserAfterRegistration(user, data.res);
    } catch (error) {
        throw ApiError.fieldValidation('oldPassword', 'invalid');
    }
}
