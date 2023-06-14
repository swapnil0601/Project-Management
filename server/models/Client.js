import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
});

export default mongoose.model("Client", ClientSchema);
