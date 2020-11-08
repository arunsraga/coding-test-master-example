const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema ({
  name: mongoose.Schema.Types.String,
  age: mongoose.Schema.Types.Number,
  colour: mongoose.Schema.Types.String,
});

module.exports = function(app) {
   app.db.model('Pets', PetSchema);
}   