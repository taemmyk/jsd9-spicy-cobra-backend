import express from "express";
import Person from "../models/person.js"

const router = express.Router();




router.get("/persons", async (req, res) => {
    const persons = await Person.find();
    res.json(persons);
  });
  
  router.get('/persons/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
  
    try {
      const person = await Person.findById(id);
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }
      res.json(person);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  router.post("/persons", async (req, res) => {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(201).json(newPerson);
  });
  
  router.put("/persons/:id", async (req, res) => {
    try {
      const existingPerson = await Person.findById(req.params.id);
  
      if (!existingPerson) {
        return res.status(404).json({ message: "Person not found" });
      }
  
      const updatedData = {
        name: req.body.name || existingPerson.name,
        avatar: req.body.avatar || existingPerson.avatar,
        city: req.body.city || existingPerson.city,
        description: req.body.description || existingPerson.description,
      };
  
      const updatedPerson = await Person.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true, runValidators: true }
      );
  
      res.json(updatedPerson);
    } catch (error) {
      res.status(500).json({ message: "Update failed", error });
    }
  });
  
  router.delete("/persons/:id", async (req, res) => {
    await Person.findByIdAndDelete(req.params.id);
    res.status(204).end();
  });
  export default router;