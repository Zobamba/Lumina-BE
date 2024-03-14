'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userExplore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userExplore.belongsTo(models.explore, {
        foreignKey: 'exploreId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  userExplore.init({
    userId: DataTypes.INTEGER,
    exploreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userExplore',
  });
  return userExplore;
};