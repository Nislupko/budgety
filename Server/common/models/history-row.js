const app = require('../../server/server');
const declareRemoteMethodFactory = require('./helpers/declareRemoteMethod');

module.exports = function (HistoryRow) {
    const declareRemoteMethod = declareRemoteMethodFactory(HistoryRow);

    declareRemoteMethod('add', create, {
        http: {path: '/add', verb: 'post'},
        description: 'Create new row',
        accepts: [
            {arg: 'amount', type: 'Number'},
            {arg: 'balance', type: 'Number'},
            {arg: 'purse', type: 'Number'},
            {arg: 'comment', type: 'String'},
            {arg: 'category', type: 'String'},
            {arg: 'res', type: 'object', 'http': {source: 'res'}},
        ],
        returns: [
            {arg: 'response', type: 'any', 'root': true},
        ],
    });

    declareRemoteMethod('getByUser', getByUser, {
      http: {path: '/getByUser', verb: 'get'},
      description: 'Get all rows for user',
      accepts: [
        {arg: 'id', type: 'Number'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: [
        {arg: 'response', type: 'any', 'root': true},
      ],
    });
  declareRemoteMethod('getByPurse', getByPurse, {
    http: {path: '/getByPurse', verb: 'get'},
    description: 'Get all rows for purse',
    accepts: [
      {arg: 'id', type: 'Number'},
      {arg: 'res', type: 'object', 'http': {source: 'res'}},
    ],
    returns: [
      {arg: 'response', type: 'any', 'root': true},
    ],
  });
};


const create = async (HistoryRow, {category, purse, amount, balance, comment}) => {
  const date = new Date();
  const newRow = await HistoryRow.create({date, category, purse, amount, balance, comment});
  return {result: newRow, status: 'success'};
};

const getByPurse = async(HistoryRow, {id}) => {
  const res = await HistoryRow.find({where: {purse: id}});
  return {result: res, status: 'success'}
};

const getByUser = async(HistoryRow, {id})  => {
  const purses = await app.models.Purse.find({
    include: {
      relation: 'PurseOwner',
      scope: {
        where: {user: id}
      }
    }
  });
  const purseIds = purses
    .filter(el => el.PurseOwner().length > 0)
    .map(el => el.id);
  const result = await HistoryRow.find({where: {purse: {inq: purseIds}}});
  return {result, status: 'success'}
};
