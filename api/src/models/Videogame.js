const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
     release_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      },
      plataform: {
        type: DataTypes.ARRAY(DataTypes.JSONB
          ),
        allowNull: false,
        defaultValue: [],
      },
      genre:  {
        type: DataTypes.ARRAY(DataTypes.JSONB
          ),
        allowNull: false,
        defaultValue: [],
      },

      image:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      
    createInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }

  });
};
