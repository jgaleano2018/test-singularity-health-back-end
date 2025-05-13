
export default (sequelize, DataTypes) => {
  const AppUser_TB = sequelize.define("AppUser_TB", {
    id: {
        type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    isMilitar: {
      type: DataTypes.BOOLEAN
    },
    timeCreate: {
      type: DataTypes.DATE
    },
    isTemporal: {
      type: DataTypes.BOOLEAN
    },
    userName: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    emailVerified: {
      type: DataTypes.STRING
    },
    verificationToken: {
      type: DataTypes.STRING
    }
  });

  return AppUser_TB;
};