export default (sequelize, DataTypes) => {
  const UserDocument_TB = sequelize.define("UserDocument_TB", {
    id: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER
    },
    document: {
      type: DataTypes.STRING
    },
    typeDocumentId: {
        type: DataTypes.INTEGER
    },
    placeExpedition: {
      type: DataTypes.STRING
    },
    dateExpedition: {
      type: DataTypes.DATE
    },
  });

  return UserDocument_TB;
};