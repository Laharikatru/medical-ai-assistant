import { useState } from "react";
import axios from "axios";

const API_URL = "https://medical-ai-assistant-1-kp5j.onrender.com";

function App() {
  const [disease, setDisease] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!disease || !query) {
      alert("Please enter both disease and query");
      return;
    }

    try {
      setLoading(true);
      setData(null);

      const res = await axios.post(`${API_URL}/search`, {
        disease,
        query,
      });

      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🧠 AI Medical Research Assistant</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Enter Disease (e.g. diabetes)"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", width: "250px" }}
        />

        <input
          placeholder="Enter Query (e.g. treatment)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", width: "250px" }}
        />

        <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
          Search
        </button>
      </div>

      {loading && <p>🔄 Fetching research data...</p>}

      {data && !loading && (
        <div>
          <h3>🧠 AI Overview</h3>
          <p>{data.overview}</p>

          <h3>📚 Research Publications</h3>
          {data.publications?.slice(0, 5).map((p, i) => (
            <div key={i} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
              <p><b>{p.display_name}</b></p>
              <p>📅 Year: {p.publication_year || "N/A"}</p>
              <p>🔗 Source: OpenAlex</p>
            </div>
          ))}

          <h3>🧪 Clinical Trials</h3>
          {data.trials?.slice(0, 5).map((t, i) => (
            <div key={i} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
              <p><b>{t.protocolSection.identificationModule.briefTitle}</b></p>
              <p>📍 Status: {t.protocolSection.statusModule.overallStatus || "N/A"}</p>
              <p>🏥 Source: ClinicalTrials.gov</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
