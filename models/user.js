'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user.hasMany(models.passion);
      user.hasMany(models.explore);
    }
  }
  user.init({ 
    firstName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    birthday: DataTypes.DATE,
    gender: DataTypes.ENUM('male', 'female'),
    pic1: DataTypes.STRING,
    pic2: DataTypes.STRING,
    pic3: DataTypes.STRING,
    pic4: DataTypes.STRING,
    pic5: DataTypes.STRING,
    pic6: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    location: DataTypes.GEOGRAPHY,
    aboutMe: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    company: DataTypes.STRING,
    school: DataTypes.STRING,
    livingIn: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};