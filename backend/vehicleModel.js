const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    year: Number,
    manufacturer: String,
    model: String,
    transmission: String,
    cylinders: Number,
    cityFE: Number,
    highwayFE: Number,
    combinedFE: Number

}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);