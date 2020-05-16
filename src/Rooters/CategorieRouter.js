const express = require("express");
const Categorie = require("../models/Categorie");
const router = new express.Router();

//get tous les categories
router.get("/categorie", async (req, res) => {
  try {
    const categories = await Categorie.find();

    res.status(200).send(categories);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get un categorie
router.get("/categorie/:id", async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) return res.status(403).send("categorie doesn't exist");
    res.status(200).send(categorie);
  } catch (e) {
    res.status(500).send(e);
  }
});

//add categorie
router.post("/categorie", async (req, res) => {
  try {
    const categorie = await new Categorie(req.body).save();
    res.status(200).send(categorie);
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete categorie
router.delete("/categorie/:id", async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie)
      return res
        .status(400)
        .send({ error: { message: "Please verify your Id" } });
    res.status(200).send(categorie);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
