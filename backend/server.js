const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let lastContext = "";

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

app.listen(5000, () => console.log("Server running on port 5000"));