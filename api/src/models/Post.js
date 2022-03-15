const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("post", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("perro", "gato", "aves", "roedores"),
      allowNull: true,
    },
    size: {
      type: DataTypes.ENUM("pequeño", "mediano", "grande"),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    image: {
      type: DataTypes.STRING(5000),
      //allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      //allowNull: false
    },
  });
};
