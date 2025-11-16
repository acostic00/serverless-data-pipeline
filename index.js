const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ======================
// CONNECT TO MONGODB ATLAS
// ======================
mongoose.connect("mongodb+srv://pipelineUser:pipeline7946@cluster0.onulaie.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ======================
// RAW DATA SCHEMA
// ======================
const DataSchema = new mongoose.Schema({
    name: String,
    value: Number,
    timestamp: { type: Date, default: Date.now }
});

const DataModel = mongoose.model("PipelineData", DataSchema);

// ======================
// TRANSFORMED DATA SCHEMA
// ======================
const transformedSchema = new mongoose.Schema({
    username: String,
    value: Number,
    category: String, 
    processedAt: { type: Date, default: Date.now }
});

const TransformedData = mongoose.model("TransformedData", transformedSchema);

// ======================
// TRANSFORMATION FUNCTION
// ======================
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

// ======================
// INGEST DATA + TRANSFORM
// ======================
app.post("/ingest", async (req, res) => {
    try {
        // Save raw data
        const item = new DataModel(req.body);
        await item.save();

        // Transform data
        const transformed = await transformData(req.body);

        res.json({
            message: "Data ingested & transformed successfully",
            transformed: transformed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing data" });
    }
});

// ======================
// FETCH RAW DATA
// ======================
app.get("/analytics", async (req, res) => {
    const data = await DataModel.find().sort({ timestamp: -1 });
    res.json(data);
});

// ======================
// FETCH TRANSFORMED DATA
// ======================
app.get("/processed", async (req, res) => {
    const data = await TransformedData.find().sort({ processedAt: -1 });
    res.json(data);
});

// ======================
// START SERVER
// ======================
app.use(express.static("public"));
app.listen(3000, () => console.log("Server running on port 3000"));
