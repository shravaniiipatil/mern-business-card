const express = require("express");
const router = express.Router();
const BusinessCard = require("../models/BusinessCard");
const QRCode = require("qrcode");

// POST route to create a new business card
router.post("/", async (req, res) => {
  try {
    const { name, jobTitle, address, email, phone, ownerEmail } = req.body;

    // Ensure that required fields are present
    if (!name || !jobTitle || !address || !email || !phone || !ownerEmail) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate the email format (basic validation)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Generate QR Code for the business card
    const qrCodeData = `Name: ${name}, Job: ${jobTitle}, Address: ${address}, Email: ${email}, Phone: ${phone}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    // Create a new BusinessCard document
    const newCard = new BusinessCard({
      name,
      jobTitle,
      address,
      email,
      phone,
      qrCode,
      ownerEmail, // Ensure the card is tied to the user who owns it
    });

    // Save the new business card to the database
    await newCard.save();
    res.status(201).json(newCard); // Respond with the created card
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to retrieve all business cards (optionally, you can filter based on ownerEmail)
router.get("/", async (req, res) => {
  try {
    // You can add a query parameter to filter by the logged-in user's email (optional)
    const { ownerEmail } = req.query; // e.g., /api/cards?ownerEmail=user@example.com

    let cards;
    if (ownerEmail) {
      cards = await BusinessCard.find({ ownerEmail });
    } else {
      cards = await BusinessCard.find(); // Get all cards if no filter is applied
    }

    res.status(200).json(cards); // Respond with the list of cards
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Optionally, you can add routes to handle updates and deletions of business cards in the future

module.exports = router;
