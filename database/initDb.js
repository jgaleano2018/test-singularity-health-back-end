import { Sequelize, DataTypes } from "sequelize";

import loadAppUser_TB from "./models/appUser_TB.model.js";
import loadContactInfo_TB from "./models/contactInfo_TB.model.js";
import loadCountry_TB from "./models/country_TB.model.js";
import loadTypeDocument_TB from "./models/typeDocument_TB.model.js";
import loadUserDocument_TB from "./models/userDocument_TB.model.js";


const sequelize = new Sequelize("project1", "user", "password", {
  host: "localhost",
  dialect: "postgres",
});

// Load Models:
const Contract = loadContact(sequelize, DataTypes);

// Setup Models:
const models = { Contract };

export { sequelize, models };