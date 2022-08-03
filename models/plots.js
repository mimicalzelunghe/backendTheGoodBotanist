var mongoose = require('mongoose');

var plotsSchema = mongoose.Schema({
    /* ID */
    name: String,
    size: Number,
    sunshine: String,
    scoring: Number,
    user_token: String,
    soil: String
    /* grounded_plants= [FK_plante]: Array*/
    /* favorite_plants= [FK_plante]: Array*/
});

var plotsModel = mongoose.model('plots', plotsSchema);

module.exports = plotsModel;