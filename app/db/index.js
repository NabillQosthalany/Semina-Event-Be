const mongoose = require("mongoose");
const { urlDb } = require("../config");

mongoose.connect(urlDb);
mongoose.set("strictQuery", false);
const db = mongoose.connection;

module.exports = db;
