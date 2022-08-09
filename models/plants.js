var mongoose = require('mongoose')

var plantSchema = mongoose.Schema({
    /* ID */
    scientific_name: String,
    common_name: String,
    flowers_color: String, /* "rouge", "blanc" */
    attracts_birds: String, /* "oui" "non" */
    attracts_butterflies: String, /* "oui" "non" */
    pollinators: String, /* "oui" "non" */
    type: String, /* "arbres","arbustres","fleurs","herbacé" */
    height: Number, /* en cm */
    width: Number, /* en cm */
    cold_hardiness: Number,
    resistance_to_drought: Number,
    sunshine: String,
    soil_nature: String, /* "calcaire""caillouteux""argileux" */
    climate: String,
    description: String,
    water_demand: Number,
})

var PlantModel = mongoose.model('plants', plantSchema);

module.exports = PlantModel;