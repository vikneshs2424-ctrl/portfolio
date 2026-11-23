import { Router } from "express";
import Contact from "../models/Contact.js";

const router = Router();

router.post("/", async (req, res, next) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim().toLowerCase();
  const subject = String(req.body?.subject || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || name.length > 100) return res.status(400).json({ message: "Enter a name up to 100 characters." });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({ message: "Enter a valid email address." });
  if (!subject || subject.length > 160) return res.status(400).json({ message: "Enter a subject up to 160 characters." });
  if (!message || message.length > 5000) return res.status(400).json({ message: "Enter a message up to 5000 characters." });

  try {
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Your message was saved.", id: contact.id });
  } catch (error) {
    next(error);
  }
});

export default router;
