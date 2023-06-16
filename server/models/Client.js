import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
});

export default mongoose.model("Client", ClientSchema);
