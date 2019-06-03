const app = require('../../server/server');
const declareRemoteMethodFactory = require('./helpers/declareRemoteMethod');

module.exports = function (PurseOwner) {
    const declareRemoteMethod = declareRemoteMethodFactory(PurseOwner);

    declareRemoteMethod('add', create, {
        http: {path: '/add', verb: 'post'},
        description: "Add owner to purse",
        accepts: [
            {arg: 'user', type: 'String'},
            {arg: 'purse', type: 'Number'},
            {arg: 'res', type: 'object', 'http': {source: 'res'}},
        ],
        returns: [
            {arg: 'response', type: 'any', 'root': true},
        ],
    });

};


const create = async (PurseOwner, {user,purse}) => {
  const usersWithLogin = await app.models.BaseUser.find({where:{login:user}});
  if (usersWithLogin.length < 0) return;
  const {id} = usersWithLogin[0];
  const newOwner = await app.models.PurseOwner.create({user: id, purse});
  return {result: newOwner, status: 'success'};
};
