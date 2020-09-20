const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email_address: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    userType: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    mobileNumber: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now }
  });
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
