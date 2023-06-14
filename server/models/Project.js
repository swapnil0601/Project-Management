import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  description: { type: String },
  status: {
    type: String,
    enum: ["In Progress", "Done", "Cancelled"],
    required: true,
  },
});

export default mongoose.model("Project", ProjectSchema);
