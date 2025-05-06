import express from "express"
import order_items from "../models/order_items.js"
import mongoose from "mongoose"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
      const allorder_items = await order_items.find(); 
      res.json(allorder_items); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid items ID" });
    }

    const order_items = await order_items.findById(id); 

    if (!order_items) {
      return res.status(404).json({ message: "items not found" });
    }

    res.json(order_items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POS
router.post("/", async (req, res) => {
  try {
   
    const neworder_items = new order_items(req.body);

    await neworder_items.save();
    res.status(201).json(neworder_items);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid items ID" });
    }

    const existingorder_items = await order_items.findById(id);

    if (!existingorder_items) {
      return res.status(404).json({ message: "items not found" });
    }

    const updatedData = {
      title: req.body.title || existingorder_items.title,
      price: req.body.price || existingorder_items.price,
      image_thumbnail: req.body.image_thumbnail || existingorder_items.image_thumbnail,
      description: req.body.description || existingorder_items.description,
      genreId: req.body.genreId || existingorder_items.genreId,
    };

    const updatedorder_items = await order_items.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    res.json(updatedorder_items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed", error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid items ID" });
    }

    const order_items = await order_items.findByIdAndDelete(id);

    if (!order_items) {
      return res.status(404).json({ message: "items not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;