const mongoose = require("mongoose");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    authToken: String,
    authTokenExpiresTimestamp: Number,
  },
  {
    collection: "users",
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await argon2.hash(this.password);
  }
  next();
});
module.exports = mongoose.model("User", userSchema);
