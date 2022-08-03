var mongoose = require('mongoose');

var gardensSchema = mongoose.Schema({
    id: Number,
    garden_name: String,
    FK_climate: Number,
    /* [FK_plot: Array] */
});

var gardensModel = mongoose.model('gardens', gardensSchema);

module.exports = gardensModel;