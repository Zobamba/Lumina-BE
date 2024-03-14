'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userPassion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userPassion.belongsTo(models.passion, {
        foreignKey: 'passionId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  userPassion.init({
    userId: DataTypes.INTEGER,
    passionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userPassion',
  });
  return userPassion;
};