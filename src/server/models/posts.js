'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {foreignKey: "user_id"})
    }
  }
  posts.init({
    user_id: DataTypes.NUMBER,
    onlyText: DataTypes.BOOLEAN,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    likes: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};