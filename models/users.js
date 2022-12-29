const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersSchema = new Schema({
    id: { type: String, required: true, unique: true },
	name: { type: String, required: true},
	age: { type: String },

});

module.exports = mongoose.model("Users", usersSchema);