import { Router } from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/auth.js";
const router = Router();

router.get("/", async (_req, res) => res.json(await Project.find().sort({ createdAt: -1 })));
router.post("/", protect, async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});
router.put("/:id", protect, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!project) return res.status(404).json({ message: "Project not found." });
  res.json(project);
});
router.delete("/:id", protect, async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found." });
  res.json({ message: "Project deleted." });
});
export default router;
