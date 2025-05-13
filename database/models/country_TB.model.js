export default (sequelize, DataTypes) => {
  const Country_TB = sequelize.define("Country_TB", {
    id: {
        type: DataTypes.INTEGER
    },
    countryCode: {
      type: DataTypes.STRING
    },
    countryName: {
      type: DataTypes.STRING
    },
  });

  return Country_TB;
};