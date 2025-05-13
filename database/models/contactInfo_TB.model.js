export default (sequelize, DataTypes) => {
  const ContactInfo_TB = sequelize.define("ContactInfo_TB", {
    id: {
        type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING
    },
    countryId: {
      type: DataTypes.INTEGER
    },
    city: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    celPhone: {
      type: DataTypes.STRING
    },
    emergencyName: {
      type: DataTypes.STRING
    },
    emergencyPhone: {
      type: DataTypes.STRING
    }
  });

  return ContactInfo_TB;
};