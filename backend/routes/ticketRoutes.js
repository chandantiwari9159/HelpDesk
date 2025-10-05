import express from "express";
import Ticket from "../models/Ticket.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Ticket
router.post("/", protect, async (req, res) => {
  const { title, description, priority } = req.body;
  const ticket = await Ticket.create({
    user: req.user._id,
    title,
    description,
    priority
  });
  res.status(201).json(ticket);
});

// Get all tickets of logged-in user
router.get("/", protect, async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id });
  res.json(tickets);
});

// Update ticket status
router.put("/:id", protect, async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  if (ticket.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  ticket.status = req.body.status || ticket.status;
  const updatedTicket = await ticket.save();
  res.json(updatedTicket);
});

export default router;
