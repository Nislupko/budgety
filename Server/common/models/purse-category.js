const app = require('../../server/server');
const declareRemoteMethodFactory = require('./helpers/declareRemoteMethod');

module.exports = function (PurseCategory) {
    const declareRemoteMethod = declareRemoteMethodFactory(PurseCategory);

    declareRemoteMethod('add', create, {
        http: {path: '/add', verb: 'post'},
        description: 'Create new purse category',
        accepts: [
            {arg: 'category', type: 'string'},
            {arg: 'purse', type: 'Number'},
            {arg: 'res', type: 'object', 'http': {source: 'res'}},
        ],
        returns: [
            {arg: 'response', type: 'any', 'root': true},
        ],
    });

    declareRemoteMethod('getById', getById, {
      http: {path: '/getById', verb: 'get'},
      description: 'Get all purses categories',
      accepts: [
        {arg: 'id', type: 'Number'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: [
        {arg: 'response', type: 'any', 'root': true},
      ],
    });
};


const create = async (PurseCategory, {category, purse}) => {
  const newCategory = await PurseCategory.create({name: category, purse});
  return {result: newCategory, status: 'success'};
};

const getById = async(PurseCategory, {id}) =>
{
  const res = await app.models.PurseCategory.find({where: {purse: id}});
  return {result: res, status: 'success'}
};
