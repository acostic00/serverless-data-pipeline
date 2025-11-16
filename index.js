const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


// MongoDB Connection

mongoose
  .connect("mongodb+srv://pipelineUser:pipeline7946@cluster0.onulaie.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// RAW DATA SCHEMA

const DataSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: { type: Date, default: Date.now }
});

const DataModel = mongoose.model("PipelineData", DataSchema);


// TRANSFORMED DATA SCHEMA

const transformedSchema = new mongoose.Schema({
  username: String,
  value: Number,
  category: String,
  processedAt: { type: Date, default: Date.now }
});

const TransformedData = mongoose.model("TransformedData", transformedSchema);


// TRANSFORMATION FUNCTION

async function transformData(rawData) {
  let category = "";

  if (rawData.value > 50) {
    category = "High";
  } else if (rawData.value >= 20) {
    category = "Medium";
  } else {
    category = "Low";
  }

  const transformed = new TransformedData({
    username: rawData.name,
    value: rawData.value,
    category: category
  });

  await transformed.save();
  return transformed;
}



// API: Ingest Raw Data + Auto Transform

app.post("/ingest", async (req, res) => {
  const item = new DataModel(req.body);
  await item.save();

  // Automatically transform
  await transformData(item);

  res.json({ message: "Data ingested & transformed successfully" });
});



// API: Get Raw Data (Analytics)

app.get("/analytics", async (req, res) => {
  const data = await DataModel.find().sort({ timestamp: -1 });
  res.json(data);
});



// API: Get Processed (Transformed) Data

app.get("/processed", async (req, res) => {
  const data = await TransformedData.find().sort({ processedAt: -1 });
  res.json(data);
});



// Start Backend Server

app.listen(4000, () => console.log("Server running on port 4000"));
