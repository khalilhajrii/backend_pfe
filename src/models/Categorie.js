const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema(
  {
    Nom_Categorie: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

categorieSchema.methods.toJSON = function () {
  const categorie = this;
  const categorieObject = categorie.toObject();
  delete categorieObject.__v;
  return categorieObject;
};

const Categorie = mongoose.model("Categorie", categorieSchema);

module.exports = Categorie;
