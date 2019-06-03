const app = require('../../server/server');
const declareRemoteMethodFactory = require('./helpers/declareRemoteMethod');

module.exports = function (BaseUser) {
    const declareRemoteMethod = declareRemoteMethodFactory(BaseUser);

    declareRemoteMethod('login', loginUser, {
        http: {path: '/login', verb: 'post'},
        description: 'Log in by password ',
        accepts: [
            {arg: 'login', type: 'string'},
            {arg: 'password', type: 'string'},
            {arg: 'res', type: 'object', 'http': {source: 'res'}},
        ],
        returns: [
            {arg: 'response', type: 'any', 'root': true},
        ],
    });

    declareRemoteMethod('register', register, {
      http: {path: '/register', verb: 'post'},
      description: 'Register new user',
      accepts: [
        {arg: 'login', type: 'string'},
        {arg: 'password', type: 'string'},
        {arg: 'email', type: 'string'},
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
      ],
      returns: [
        {arg: 'response', type: 'any', 'root': true},
      ],
    });
};

const loginUser = async (BaseUser, data) => {
  const {login, password} = data;
  const user = await BaseUser.findOne({where: {login}});
  const res = {login: user.login, id: user.id};
  return {result: res, status: 'success'};
};
const register = async (BaseUser, data) => {
  const {login, password, email} = data;
  const result = await BaseUser.create({login, password, email});
  return {result, status: 'success'};
};
