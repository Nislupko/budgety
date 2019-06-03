const app = require('../../server/server');
const declareRemoteMethodFactory = require('./helpers/declareRemoteMethod');

module.exports = function (Purpose) {
    const declareRemoteMethod = declareRemoteMethodFactory(Purpose);

    declareRemoteMethod('add', create, {
        http: {path: '/add', verb: 'post'},
        description: 'Create new purpose',
        accepts: [
            {arg: 'name', type: 'string', required: true},
            {arg: 'amount', type: 'Number', required: true},
            {arg: 'finalAmount', type: 'Number', required: true},
            {arg: 'finalDate', type: 'string'},
            {arg: 'purse', type: 'Number', required: true},
            {arg: 'comment', type: 'string'},
            {arg: 'res', type: 'object', 'http': {source: 'res'}},
        ],
        returns: [
            {arg: 'response', type: 'any', 'root': true},
        ],
    });

    declareRemoteMethod('update', update, {
      http: {path: '/update', verb: 'post'},
      description: 'Update current purpose',
      accepts: [
        {arg: 'name', type: 'string', required: true},
        {arg: 'amount', type: 'Number', required: true},
        {arg: 'finalAmount', type: 'Number', required: true},
        {arg: 'finalDate', type: 'string'},
        {arg: 'purse', type: 'Number', required: true},
        {arg: 'comment', type: 'string'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: [
        {arg: 'response', type: 'any', 'root': true},
      ],
    });

    declareRemoteMethod('get', get, {
      http: {path: '/', verb: 'get'},
      description: 'Get all users purses',
      accepts: [
        {arg: 'purse', type: 'number'},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
      ],
      returns: [
        {arg: 'response', type: 'any', 'root': true},
      ],
    });
};


const create = async (Purpose, {name, amount, finalAmount, finalDate, purse, comment}) => {
  return {result: true, status: 'success'};
};
const update = async (Purpose, {name, amount, finalAmount, finalDate, purse, comment}) => {
  return {result: true, status: 'success'};
};

const get = async (Purpose, {purse}) =>
{
  return {result: true, status: 'success'};
};
