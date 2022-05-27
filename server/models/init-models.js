var DataTypes = require("sequelize").DataTypes;
var _jobs = require("./jobs");
var _users = require("./users");

function initModels(sequelize) {
  var jobs = _jobs(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    jobs,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
