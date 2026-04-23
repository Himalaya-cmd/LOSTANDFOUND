const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// ADD
router.post("/", auth, async (req, res) => {
  const item = await Item.create({ ...req.body, user: req.user });
  res.json(item);
});

// GET ALL
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// SEARCH
router.get("/search", async (req, res) => {
  const { name } = req.query;
  const items = await Item.find({
    itemName: { $regex: name, $options: "i" }
  });
  res.json(items);
});

module.exports = router;