require("dotenv").config();

const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        dialect: "mysql",
    },
    test: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        dialect: "mysql",
    },
    production: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        dialect: "mysql",
    },
};
