'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      passion.belongsToMany(models.user, {
        through: 'userPassion',
        foreignKey: 'passionId',
        otherKey: 'userId',
      });
    }
  }
  passion.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'passion',
  });
  return passion;
};