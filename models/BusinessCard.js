const mongoose = require("mongoose");

const BusinessCardSchema = new mongoose.Schema({
  name: String,
  jobTitle: String,
  address: String,
  email: String,
  phone: String,
  qrCode: String,
});

module.exports = mongoose.model("BusinessCard", BusinessCardSchema);
