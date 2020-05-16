const express = require("express");
const Contact = require("../models/Contact");
const router = new express.Router();

//get tous les feedbacks
router.get("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).send(contacts);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get un feedback
router.get("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(403).send("contact doesn't exist");
    res.status(200).send(contact);
  } catch (e) {
    res.status(500).send(e);
  }
});

//add feedback
router.post("/contact", async (req, res) => {
  try {
    const contact = await new Contact(req.body).save();
    res.status(200).send(contact);
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete feedback
router.delete("/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact)
      return res
        .status(403)
        .send({ error: { message: "no feedback with this Id" } });
    res.status(200).send(contact);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
