'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "User id needed."
          }
        }
      },
      onlyText: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      url: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.STRING,
        defaultValue: JSON.stringify([])
      },
      comments: {
        type: Sequelize.STRING,
        defaultValue: JSON.stringify([])
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
    await queryInterface.dropTable('posts');
  }
};