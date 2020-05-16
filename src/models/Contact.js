const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    Nom: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    Message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.methods.toJSON = function () {
  const contact = this;
  const contactObject = contact.toObject();
  delete contactObject.__v;
  return contactObject;
};

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
