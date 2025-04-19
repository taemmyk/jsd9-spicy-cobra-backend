const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB error:", err));

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

app.get("/persons/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const person = await Person.findById(id);
    if (!person) return res.status(404).json({ message: "Not found" });
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: "Internal error" });
  }
});

app.post("/persons", async (req, res) => {
  const newPerson = new Person(req.body);
  await newPerson.save();
  res.status(201).json(newPerson);
});

app.put("/persons/:id", async (req, res) => {
  try {
    const updated = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err });
  }
});

app.delete("/persons/:id", async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
