const app = require('../../server/server');
const declareRemoteMethodFactory = require('./helpers/declareRemoteMethod');

module.exports = function (UserCategory) {
    const declareRemoteMethod = declareRemoteMethodFactory(UserCategory);

    declareRemoteMethod('add', create, {
        http: {path: '/add', verb: 'post'},
        description: 'Create new user category',
        accepts: [
            {arg: 'category', type: 'string'},
            {arg: 'user', type: 'Number'},
            {arg: 'res', type: 'object', 'http': {source: 'res'}},
        ],
        returns: [
            {arg: 'response', type: 'any', 'root': true},
        ],
    });

    declareRemoteMethod('getById', getById, {
      http: {path: '/getById', verb: 'get'},
      description: 'Get all users categories',
      accepts: [
        {arg: 'id', type: 'Number'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: [
        {arg: 'response', type: 'any', 'root': true},
      ],
    });
};


const create = async (UserCategory, {category, user}) => {
  const newCategory = await UserCategory.create({name: category, user});
  return {result: newCategory, status: 'success'};
};

const getById = async(UserCategory, {id}) =>
{
  const res = await app.models.UserCategory.find({where: {user: id}});
  return {result: res.map(x => x.name), status: 'success'}
};
