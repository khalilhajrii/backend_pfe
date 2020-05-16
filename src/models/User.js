const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Produit = require("./Produit");
const Demande = require("./Demande");
const userSchema = new mongoose.Schema(
  {
    Nom: {
      type: String,
      required: true,
      trim: true,
    },
    Prenom: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    Sexe: {
      type: String,
      trim: true,
      default: "Homme",
    },
    Adresse: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    Numero: {
      type: String,
      validate(value) {
        if (value.length !== 8) throw new Error("Phone must have 8 digits");
      },
      required: true,
    },
    Naissance: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("produits", {
  ref: "Produit",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("demandes", {
  ref: "Demande",
  localField: "_id",
  foreignField: "owner",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.Password;
  delete userObject.__v;
  return userObject;
};

userSchema.statics.findByCredentials = async (Email, Password) => {
  const user = await User.findOne({ Email });
  if (!user) return;
  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) return;
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("Password")) {
    user.Password = await bcrypt.hash(user.Password, 8);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Produit.deleteMany({ owner: user._id });
  await Demande.deleteMany({ owner: user._id });

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
