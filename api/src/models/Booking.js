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
        defaultValue: 'pending'
      },
    reservation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW()
    },
    check_in: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    check_out: {
      type: DataTypes.DATE,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING
    },
    preference_id: {
      type: DataTypes.STRING
    },
    payment_id: {
      type: DataTypes.STRING
    }
  });
};
