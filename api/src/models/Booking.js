const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("booking", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reservation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW()
    },
    check_in: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    check_out: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  });
};
