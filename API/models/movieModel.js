const mongoose = require("mongoose");
const fieldSchema = mongoose.Schema({
    title: { type: String, required: true },
    directorName: { type: String, required: true },
    bannerUrl: { type: String, required: true },
    dateReleased: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref : 'user' , trim : true ,required: true},
    updatedBy: { type: mongoose.Schema.ObjectId, ref : 'user' , trim : true ,required: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
module.exports = mongoose.model("movie", fieldSchema);