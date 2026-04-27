const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (important for Render check)
app.get("/", (req, res) => {
  res.send("Medical AI Backend is running");
});

// Context memory
let lastContext = "";

// Main API route
app.post("/search", async (req, res) => {
  let { disease, query } = req.body;

  if (!disease && lastContext) {
    disease = lastContext;
  } else {
    lastContext = disease;
  }

  const finalQuery = `${disease} ${query}`;

  try {
    const openalex = await axios.get(
      `https://api.openalex.org/works?search=${finalQuery}&per-page=5`
    );

    let trialsData = [];
    try {
      const trials = await axios.get(
        `https://clinicaltrials.gov/api/v2/studies?query.cond=${disease}&pageSize=5&format=json`
      );
      trialsData = trials.data.studies;
    } catch (e) {
      console.log("Trials API failed");
    }

    const summary = `Based on research for ${disease}, studies and clinical trials indicate progress in ${query}.`;

    res.json({
      overview: summary,
      publications: openalex.data.results || [],
      trials: trialsData || [],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API error" });
  }
});

// IMPORTANT: Use dynamic port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
