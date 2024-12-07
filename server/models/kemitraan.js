'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kemitraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kemitraan.init({
    title: DataTypes.STRING,
    icon: DataTypes.STRING,
    jumlah: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kemitraan',
    tableName: 'Kemitraans'
  });
  return Kemitraan;
};