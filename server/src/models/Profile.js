import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  name: { type: String, default: "Viknesh S" },
  role: { type: String, default: "MCA Student | Aspiring Full-Stack Developer" },
  summary: { type: String, default: "" },
  email: { type: String, default: "vikneshs2424@gmail.com" },
  phone: { type: String, default: "+91 7530070933" },
  location: { type: String, default: "Tamil Nadu, India" },
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  photo: { type: String, default: "/profile.jpg" },
  resume: { type: String, default: "" },
  skills: [{ type: String }]
}, { timestamps: true });
export default mongoose.model("Profile", profileSchema);
