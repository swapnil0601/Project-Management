import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String, unique: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  description: { type: String },
  status: {
    type: String,
    enum: ["In Progress", "Completed", "Not Started"],
  },
});

export default mongoose.model("Project", ProjectSchema);
