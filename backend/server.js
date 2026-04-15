let lastContext = "";

app.post("/search", async (req, res) => {
  let { disease, query } = req.body;

  // Context Awareness
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

    // 🧠 Simulated LLM Reasoning
    const summary = `
Based on recent research for ${disease}, several studies highlight advancements related to ${query}.
Clinical trials indicate ongoing efforts to validate treatment effectiveness.
This system aggregates publications and trial data to provide structured insights.
`;

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