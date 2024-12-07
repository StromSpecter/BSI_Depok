'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimoni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimoni.init({
    name: DataTypes.STRING,
    instansi: DataTypes.STRING,
    description: DataTypes.TEXT,
    star: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Testimoni',
    tableName: 'Testimonis'
  });
  return Testimoni;
};