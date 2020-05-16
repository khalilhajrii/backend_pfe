const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
  {
    Nom_produit: {
      type: String,
      required: true,
      trim: true,
    },
    Prix: {
      type: Number,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Categorie: {
      type: String,
      trim: true,
      required: true,
    },
    Emplacement: {
      type: String,
      required: true,
    },
    commentaires: [
      {
        Nom: String,
        Description: String,
      },
    ],
    img1: { data: Buffer, contentType: String },
    img2: { data: Buffer, contentType: String },
    img3: { data: Buffer, contentType: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

produitSchema.methods.toJSON = function () {
  const produit = this;
  const produitObject = produit.toObject();
  delete produitObject.__v;
  return produitObject;
};

const Produit = mongoose.model("Produit", produitSchema);

module.exports = Produit;
