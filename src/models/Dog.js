const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          isUrl:true
        }
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

const dogInfo = {
  breeds: [
    {
      weight: {
        imperial: "20 - 30",
        metric: "9 - 14",
      },
      height: {
        imperial: "11.5 - 13.5",
        metric: "29 - 34",
      },
      id: 242,
      name: "Swedish Vallhund",
      breed_group: "Herding",
      life_span: "12 - 14 years",
      temperament:
        "Fearless, Friendly, Energetic, Alert, Intelligent, Watchful",
      reference_image_id: "HJ-Dix94Q",
    },
  ],
  id: "HJ-Dix94Q",
  url: "https://cdn2.thedogapi.com/images/HJ-Dix94Q_1280.jpg",
  width: 1280,
  height: 851,
};
