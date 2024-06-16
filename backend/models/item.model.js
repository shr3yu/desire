const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// note: figure out how to add image

const itemSchema = new Schema({
  itemName: { type: String, required: true },
  description: { type: String },
  amount: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  listId: { type: String, required: true },
  userId: { type: String, required: true },
  createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Item", itemSchema);
