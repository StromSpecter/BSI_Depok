"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here, misalnya:
      // Program.belongsTo(models.User, { foreignKey: 'authorId' });
    }
  }
  Program.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      path: { type: DataTypes.STRING, allowNull: false, unique: true },
      icon: { type: DataTypes.STRING, allowNull: true },
      author: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      image1: { type: DataTypes.STRING, allowNull: true },
      image2: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Program",
      tableName: "Programs", // Nama tabel di database
      timestamps: true, // Menambahkan createdAt dan updatedAt
    }
  );
  return Program;
};
