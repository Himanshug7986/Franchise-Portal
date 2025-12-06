import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET 
    );
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const checkAcceptedStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.franchiseRequestStatus !== 'accepted') {
      return res.status(403).json({
        message: "Access denied. Your franchise request is not yet accepted.",
        status: user.franchiseRequestStatus
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

router.get("/status", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: user.franchiseRequestStatus,
      requestDate: user.requestDate,
      adminNotes: user.adminNotes
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/dashboard", verifyToken, checkAcceptedStatus, async (req, res) => {
  try {
    res.json({
      message: "Welcome to your franchise dashboard!",
      user: {
        name: req.user.name,
        email: req.user.email,
        status: req.user.franchiseRequestStatus
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
