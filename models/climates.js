var mongoose = require('mongoose');

var climateSchema = mongoose.Schema({
    /* ID */
    climate_type: String, /* "continental", "mediterraneen", "montagne", "tropical", "atlantique"  */
    max_temp: Number, /* (°C) */
    min_temp: Number, /* (°C) */
    months_drought: Number, /* 0.5, 1, 4.5 */
    rainfall: Number

});

var ClimateModel = mongoose.model('climate', climateSchema);

module.exports = ClimateModel;