const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  description: String,
  city: String,
  id: Number,
});

const Person = mongoose.model("Person", personSchema); 

async function createPeople() {
  await mongoose.connect("mongodb://localhost:27017/personsDB");

 

  await Person.insertMany(persons); 
  console.log("ข้อมูลถูกเพิ่มเรียบร้อยแล้ว");

  await mongoose.disconnect();
}


createPeople().catch(console.error);
