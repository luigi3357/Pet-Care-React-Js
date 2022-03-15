const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,

    },
    name: {
      type: DataTypes.STRING,

    },
    last_name: {
      type: DataTypes.STRING,

    },
    bio: {
      type: DataTypes.STRING,

    },
    phone: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    keeper: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
      //Indicador del status del usuario como cuidador
    },
    rating: {
      type: DataTypes.DECIMAL(3,2),
      defaultValue: 0.00
    },
    bookings: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    profileImgURL: {
      type: DataTypes.STRING,
    },
    myImages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    }
    },
  );
};