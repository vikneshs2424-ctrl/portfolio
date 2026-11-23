import { Router } from "express";
import Profile from "../models/Profile.js";
import { protect } from "../middleware/auth.js";
const router = Router();

router.get("/", async (_req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  res.json(profile);
});
router.put("/", protect, async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create(req.body);
  else Object.assign(profile, req.body);
  await profile.save();
  res.json(profile);
});
export default router;
