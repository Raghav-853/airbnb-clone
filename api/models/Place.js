const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [Strings],
    extraInfo: String,
    
});