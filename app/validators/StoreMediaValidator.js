const { body } = require("express-validator");

const rules = [body("directory", "Directory is required.").notEmpty()];

module.exports = rules;
