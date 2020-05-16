const express = require("express");
const Demande = require("../models/Demande");
const Produit = require("../models/Produit");
const User = require("../models/User");
const router = new express.Router();

//get tous les demandes
router.get("/demande", async (req, res) => {
  try {
    const demandes = await Demande.find();

    res.status(200).send(demandes);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get tous les demandes d'un utilsateur
router.get("/demandeO/:owner", async (req, res) => {
  try {
    const user = await User.findById(req.params.owner);
    await user.populate("demandes").execPopulate();
    res.status(200).send(user.demandes);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get un demande
router.get("/demande/:id", async (req, res) => {
  try {
    const demande = await Demande.findById(req.params.id);
    if (!demande) return res.status(403).send("demande doesn't exist");
    res.status(200).send(demande);
  } catch (e) {
    res.status(500).send(e);
  }
});

//add demande + produits [min   max ]
router.post("/demande", async (req, res) => {
  try {
    const demande = await new Demande(req.body).save();
    const max = demande.Prix + demande.Budg;
    const min = demande.Prix - demande.Budg;

    const prods = await Produit.find({
      Nom_produit: demande.Nom_produit,
      Prix: {
        $gt: min,
        $lt: max,
      },
    });
    res.status(200).send({ demande, prods });
  } catch (e) {
    res.status(500).send(e);
  }
});

//upadate demande
router.patch("/demande/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    let demande = await Demande.findById(req.params.id);
    if (!demande)
      return res.status(403).send({ error: "Please verify your Id" });
    updates.forEach((update) => {
      demande[update] = req.body[update];
    });
    await demande.save();
    res.status(200).send(demande);
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete demande
router.delete("/demande/:id", async (req, res) => {
  try {
    const demande = await Demande.findByIdAndDelete(req.params.id);
    if (!demande)
      return res
        .status(400)
        .send({ error: { message: "Please verify your Id" } });
    res.status(200).send(demande);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
