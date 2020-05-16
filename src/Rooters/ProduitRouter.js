const express = require("express");
const Produit = require("../models/Produit");
const User = require("../models/User");
const router = new express.Router();

//get tous les produits
router.get("/produit", async (req, res) => {
  try {
    const prods = await Produit.find();

    res.status(200).send(prods);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get tous les produits pour un catégorie spécific
router.get("/produitC/:cat", async (req, res) => {
  try {
    const prods = await Produit.find({ Categorie: req.params.cat });
    res.status(200).send(prods);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get tous les produits pour un nom du produit spécific
router.get("/produitN/:nom", async (req, res) => {
  try {
    const prods = await Produit.find({ Nom_produit: req.params.nom });
    res.status(200).send(prods);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get tous les produits d'un utilsateur
router.get("/produitO/:owner", async (req, res) => {
  try {
    const user = await User.findById(req.params.owner);
    await user.populate("produits").execPopulate();
    res.status(200).send(user.produits);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get un produit
router.get("/produit/:id", async (req, res) => {
  try {
    const prod = await Produit.findById(req.params.id);
    if (!prod) return res.status(403).send("Product doesn't exist");
    res.status(200).send(prod);
  } catch (e) {
    res.status(500).send(e);
  }
});

//add Produit
router.post("/produit", async (req, res) => {
  try {
    const prod = await new Produit(req.body).save();
    res.status(200).send(prod);
  } catch (e) {
    res.status(500).send(e);
  }
});

//upadate produit
router.patch("/produit/:id", async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    let prod = await Produit.findById(req.params.id);
    if (!prod) return res.status(403).send({ error: "Please verify your Id" });
    updates.forEach((update) => {
      prod[update] = req.body[update];
    });
    await prod.save();
    res.status(200).send(prod);
  } catch (e) {
    res.status(500).send(e);
  }
});

//add commantaire pour un produit
router.patch("/produitC/:id", async (req, res) => {
  try {
    const prod = await Produit.findById(req.params.id);
    if (!prod) return res.status(403).send("product doesn't exist");
    prod.commentaires.push(req.body);
    await prod.save();
    res.status(200).send(prod);
  } catch (e) {
    res.status(500).send(e);
  }
});

////upadate produit
router.delete("/produit/:id", async (req, res) => {
  try {
    const prod = await Produit.findByIdAndDelete(req.params.id);
    if (!prod)
      return res
        .status(400)
        .send({ error: { message: "Please verify your Id" } });
    res.status(200).send(prod);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
