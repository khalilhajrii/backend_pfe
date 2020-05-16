const express = require("express");
const cors = require("cors");
require("./db/mongoose");

const UserR = require("./Rooters/UserRooter");
const ProduitR = require("./Rooters/ProduitRouter");
const DemandeR = require("./Rooters/DemandeRouter");
const CategorieR = require("./Rooters/CategorieRouter");
const ContactR = require("./Rooters/ContactRouter");

const app = express();
app.use(express.json());
app.use(UserR);
app.use(ProduitR);
app.use(DemandeR);
app.use(CategorieR);
app.use(ContactR);
app.use(cors());

const port = 4000;
app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
