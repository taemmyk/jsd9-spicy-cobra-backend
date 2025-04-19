const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)


const personSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  city: String,
  description: String,
});

const Person = mongoose.model("Person", personSchema);

app.get("/persons", async (req, res) => {
  const persons = await Person.find();
  res.json(persons);
});

app.get('/persons/:id', async (req, res) => {
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

app.post("/persons", async (req, res) => {
  const newPerson = new Person(req.body);
  await newPerson.save();
  res.status(201).json(newPerson);
});

app.put("/persons/:id", async (req, res) => {
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

app.delete("/persons/:id", async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
