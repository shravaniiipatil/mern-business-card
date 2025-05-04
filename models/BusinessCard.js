const mongoose = require("mongoose");

// Business Card Schema
const BusinessCardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Ensures that the name field is required
      trim: true, // Removes leading/trailing spaces
    },
    jobTitle: {
      type: String,
      required: true, // Job title is also required
      trim: true,
    },
    address: {
      type: String,
      required: true, // Address is required
      trim: true,
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Ensures no two business cards can have the same email
      trim: true,
      lowercase: true, // Automatically converts email to lowercase
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Simple email regex
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      required: true, // Phone number is required
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"], // Validates phone number (assumes 10 digits)
    },
    qrCode: {
      type: String,
      required: true, // QR code string is required (generated QR code URL or data)
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation time to the current date
    },
    ownerEmail: {
      type: String,
      required: true, // Owner email is required to associate the business card
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model("BusinessCard", BusinessCardSchema);
