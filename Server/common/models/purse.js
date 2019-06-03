const app = require('../../server/server');
const declareRemoteMethodFactory = require('./helpers/declareRemoteMethod');

module.exports = function (Purse) {
    const declareRemoteMethod = declareRemoteMethodFactory(Purse);

    declareRemoteMethod('add', create, {
        http: {path: '/add', verb: 'post'},
        description: 'Create new purse',
        accepts: [
            {arg: 'name', type: 'string'},
            {arg: 'balance', type: 'Number'},
            {arg: 'user', type: 'Number'},
            {arg: 'res', type: 'object', 'http': {source: 'res'}},
        ],
        returns: [
            {arg: 'response', type: 'any', 'root': true},
        ],
    });

    declareRemoteMethod('getByLogin', getByLogin, {
      http: {path: '/getByLogin', verb: 'post'},
      description: 'Get all users purses',
      accepts: [
        {arg: 'login', type: 'string'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: [
        {arg: 'response', type: 'any', 'root': true},
      ],
    });
};


const create = async (Purse, {name, balance, user}) => {
  const newPurse = await Purse.create({name, balance});
  const newOwner = await app.models.PurseOwner.create({user, purse: newPurse.id});
  return {result: {...newPurse, ...newOwner}, status: 'success'};
};

const getByLogin = async (Purse, {login}) =>
{
  const user = await app.models.BaseUser.findOne({where: {login}});
  const result = await Purse.find({include: ['PurseOwner', 'PurseCategory', 'Purpose']});
  const allUsers = await app.models.BaseUser.find();

  const resp = result.filter( row => {
    return row.PurseOwner().some(owner => user.id === owner.user)
  });
  const res = resp
    .map(el => ({
      id: el.id,
      name: el.name,
      balance: el.balance,
      categories: el.PurseCategory().map(x=>x.name),
      purposes: el.Purpose(),
      owners: el.PurseOwner().map(owner => {
        return allUsers.filter(u => u.id === owner.user)[0].login;
      })
    }));

  return {result: res, status: 'success'};
};
