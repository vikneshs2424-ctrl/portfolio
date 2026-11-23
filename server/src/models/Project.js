import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: "Web Development" },
  date: { type: String, default: "" },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  highlights: [{ type: String }],
  github: { type: String, default: "" },
  demo: { type: String, default: "" },
  featured: { type: Boolean, default: false }
}, { timestamps: true });
export default mongoose.model("Project", projectSchema);
