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
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email cannot be empty"
          },
          isEmail: {
            args: true,
            msg: "Enter a valid Email"
          }
        }
      },
      adress: {
        type: Sequelize.STRING,
        defaultValue: "North Cyprus",

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bio: {
        type: Sequelize.STRING
      },
      profile_photo: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "https://developerszone.net/wp-content/uploads/2020/07/verified-users-circle.png"
      },
      following: {
        type: Sequelize.STRING,
        defaultValue: JSON.stringify([])
      },
      followers: {
        type: Sequelize.STRING,
        defaultValue: JSON.stringify([])
      },
      mail_confirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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