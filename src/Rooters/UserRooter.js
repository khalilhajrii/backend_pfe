const express = require("express");
const User = require("../models/User");
const router = new express.Router();

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.Email,
      req.body.Password
    );
    if (!user)
      return res.status(400).send({ errors: "Please verify your information" });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get user
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).send({ error: "Please verify your informations" });
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Add user
router.post("/user", async (req, res) => {
  try {
    const exist = await User.findOne({
      Email: req.body.Email,
    });
    if (exist)
      return res.status(403).send({
        error: "User already exists, check your Email",
      });
    const user = await new User(req.body).save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//update user
router.patch("/user/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).send({ error: "Please Verify your informations" });

    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete user
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send({ error: "no such user" });
    await user.remove();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
