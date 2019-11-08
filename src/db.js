const mongoose = require("mongoose");
const { mongodb } = require('./keys');

mongoose
  .connect(mongodb.URI, mongodb.settings)
  .then(() => console.log("db is connected"))
  .catch(err => console.log(`error in db ${err}`));

module.exports = mongoose;
