export default (sequelize, DataTypes) => {
  const TypeDocument_TB = sequelize.define("TypeDocument_TB", {
    id: {
        type: DataTypes.INTEGER
    },
    nameTypeDocument: {
      type: DataTypes.STRING
    },
  });

  return TypeDocument_TB;
};