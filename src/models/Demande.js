const mongoose = require("mongoose");

const demandeSchema = new mongoose.Schema(
  {
    Nom_produit: {
      type: String,
      trim: true,
      required: true,
    },
    Categorie: {
      type: String,
      trim: true,
      required: true,
    },
    Prix: {
      type: Number,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Budg: {
      type: Number,
      required: true,
    },
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

demandeSchema.methods.toJSON = function () {
  const demande = this;
  const demandeObject = demande.toObject();
  delete demandeObject.__v;
  return demandeObject;
};

const Demande = mongoose.model("Demande", demandeSchema);

module.exports = Demande;
