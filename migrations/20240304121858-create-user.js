'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: true,
      },
      pic1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pic2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pic3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pic4: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pic5: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pic6: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.GEOGRAPHY('POINT'),
        allowNull: true,
      },
      aboutMe: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      school: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      livingIn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};