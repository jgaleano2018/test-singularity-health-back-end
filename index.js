import express   from 'express';
import http  from 'http';
import  { graphqlHTTP } from 'express-graphql';
import { GraphQLScalarType, Kind, buildSchema } from 'graphql';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt'

import AppUser_TB from "./database/models/appUser_TB.model.js";
import ContactInfo_TB from "./database/models/contactInfo_TB.model.js";
import Country_TB from "./database/models/country_TB.model.js";
import TypeDocument_TB from "./database/models/typeDocument_TB.model.js";
import UserDocument_TB from "./database/models/userDocument_TB.model.js";

//const Op = db.Sequelize.Op;


let con = {};
const app = express();
app.use(express.json({ limit: '16mb' }))

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

  const resolverDate = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return value; // value from the client
    },
    serialize(value) {
      return value; // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return ast.value // ast value is always in string format
      }
      return null;
    },
  }),
};

const schema = buildSchema(`
  scalar Date
  type User {
    Id: Int
    Name: String
    IsMilitar: Boolean
    TimeCreate: Date
    IsTemporal: Boolean
    UserName: String
    Password: String
    Email: String
    EmailVerified: String
    VerificationToken:String,
    NameTypeDocument: String,
    Document: String
    PlaceExpedition: String
    DateExpedition: Date
    CountryCode: String
    CountryName: String
    Address: String
    City: String
    Phone: String
    CelPhone: String
    EmergencyName: String
    EmergencyPhone: String
  }
  type TypeDocument {
    Id: Int
    NameTypeDocument: String
  }
  type Country {
    Id: Int
    CountryCode: String
    CountryName: String
  }  
  type Query {
    getUsers: [User],
    getUser(id: Int):User,
    getTypeDocuments: [TypeDocument],
    getCountries: [Country],
    }
  type Mutation {
    
    createAppUser_TB(name: String, lastName: String, isMilitar: Boolean, timeCreate: Date, isTemporal: Boolean, userName: String, password: String, email: String, emailVerified: String, verificationToken:String,
      typeDocumentId: Int, document: String, placeExpedition: String, dateExpedition: Date, countryId: Int, address: String, city: String, phone: String, cellPhone: String, emergencyName: String, emergencyPhone: String): Boolean
    
  }
`);

con = mysql.createConnection({
  host: 'localhost',
    port: 4306,
    user: 'root',
    password: '',
    database: 'bdsingularityhealth',
});

con.connect((err) => {
  if (err) {
    console.log('Error connecting to database:'+err);
    return;
  }
  console.log('Connected to database');
});

app.use((req, res, next) => {
  req.mysqlDb = con;
  next();
});

const queryDB = (req, sql, args) => new Promise((resolve, reject) => {
  req.mysqlDb.query(sql, args, (err, rows) => {
      if (err) return reject(err);
      rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
  });
});  

const root = {
  getCountries: (args, req) => queryDB(req, "select * from country_tb").then(data => data),
  getTypeDocuments: (args, req) => queryDB(req, "select * from typedocument_tb").then(data => data),
  getUsers: (args, req) => queryDB(req, "SELECT * FROM appuser_tb AU INNER JOIN userdocument_tb US ON US.UserId = AU.Id INNER JOIN typedocument_tb TD ON TD.Id = US.TypeDocumentId INNER JOIN contactinfo_tb CI ON CI.UserId = AU.Id INNER JOIN country_tb CT ON CT.Id = CI.CountryId").then(data => data),
  getUser: (args, req) => queryDB(req, "select * from users where id = ?", [args.id]).then(data => data[0]),
  createAppUser_TB: (args, req) => {
    
    // Create and Save a new user

    let userJson = {
        "LastName": args.lastName,
        "Name": args.name,
        "IsMilitar": args.isMilitar,
        "TimeCreate": args.timeCreate,
        "IsTemporal": args.isTemporal,
        "UserName": args.userName,
        "Password": args.password,
        "Email": args.email,
        "EmailVerified": args.emailVerified,
        "VerificationToken": args.verificationToken
    }

    queryDB(req, "SELECT * FROM appuser_tb AU INNER JOIN userdocument_tb US ON US.UserId = AU.Id WHERE AU.Name = ? AND AU.LastName = ? AND AU.UserName = ? AND AU.Password = ? AND US.Document = ?", [args.name, args.lastName, args.userName, args.password, args.document]).then(data =>
        {
            if (data.length === 0) {

                queryDB(req, "insert into appuser_tb SET ?", userJson).then(data2 => {

                queryDB(req, "SELECT max(AU.id) AS UserId FROM appuser_tb AU WHERE AU.Name = ? AND AU.LastName = ? AND AU.UserName = ? AND AU.Password = ?", [args.name, args.lastName, args.userName, args.password]).then(data3 =>
                {
                    if (data3.length > 0) {
                        let userDocumentJson = {
                            "UserId": data3[0].UserId,
                            "DateExpedition": args.dateExpedition,
                            "Document": args.document,
                            "PlaceExpedition": args.placeExpedition,
                            "TypeDocumentId": args.typeDocumentId
                        }

                        queryDB(req, "insert into userdocument_tb SET ?", userDocumentJson).then(data4 => data4)

                        let contactInfoJson = {
                            "UserId": data3[0].UserId,
                            "Address": args.address,
                            "CountryId": args.countryId,
                            "City": args.city,
                            "Phone": args.phone,
                            "CelPhone": args.cellPhone,
                            "EmergencyName": args.emergencyName,
                            "EmergencyPhone": args.emergencyPhone
                        }

                        queryDB(req, "insert into contactinfo_tb SET ?", contactInfoJson).then(data5 => data5)


                    }

                })

                })

            }

        })

  },
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const httpServer = http.createServer(app);
httpServer.listen('4000');
console.log('Running a GraphQL API server 🚀 at localhost:4000/graphql');