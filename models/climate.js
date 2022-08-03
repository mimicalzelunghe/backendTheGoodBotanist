var mongoose = require('mongoose');

var climateSchema = mongoose.Schema({
    /* ID */
    climate_type: String, /* "continental", "mediterraneen", "montagneux", "tropical", "atlantique"  */
    max_temp: Number, /* (°C) */
    min_temp: Number, /* (°C) */
    months_drought: Number, /* 0.5, 1, 4.5 */
    rainfall: Number

});

var climateModel = mongoose.model('gardens', climateSchema);

module.exports = climateModel;