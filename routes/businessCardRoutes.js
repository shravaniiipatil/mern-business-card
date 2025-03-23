const express = require("express");
const router = express.Router();
const BusinessCard = require("../models/BusinessCard");
const QRCode = require("qrcode");

router.post("/", async (req, res) => {
  try {
    const { name, jobTitle, address, email, phone } = req.body;
    const qrCodeData = `Name: ${name}, Job: ${jobTitle}, Address: ${address}, Email: ${email}, Phone: ${phone}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);
    const newCard = new BusinessCard({ name, jobTitle, address, email, phone, qrCode });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cards = await BusinessCard.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
