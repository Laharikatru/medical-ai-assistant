import { useState } from "react";
import axios from "axios";

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

      const res = await axios.post("http://localhost:5000/search", {
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
  <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>

    <h2 style={{ textAlign: "center", color: "#2a7fba", marginBottom: "20px" }}>
      🧠 AI Medical Research Assistant
    </h2>

    {/* Input Section */}
      {/* Input Section */}
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

        <button
  onClick={handleSearch}
  style={{
    padding: "10px 16px",
    backgroundColor: "#2a7fba",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontWeight: "bold",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#1f5f8a")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "#2a7fba")}
>
  🔍 Search
</button>
      </div>

      {/* Loading */}
      {loading && <p>🔄 Fetching research data...</p>}

      {/* Results */}
      {data && !loading && (
        <div>
          <h3>🧠 AI Overview</h3>
<p>{data.overview}</p>
          {/* Publications */}
          <h3>📚 Research Publications</h3>
          {data.publications?.slice(0, 5).map((p, i) => (
            <div
              key={i}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p><b>{p.display_name}</b></p>
              <p>📅 Year: {p.publication_year || "N/A"}</p>
              <p>🔗 Source: OpenAlex</p>
            </div>
          ))}

          {/* Clinical Trials */}
          <h3>🧪 Clinical Trials</h3>
          {data.trials?.slice(0, 5).map((t, i) => (
            <div
              key={i}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p>
                <b>
                  {t.protocolSection.identificationModule.briefTitle}
                </b>
              </p>
              <p>
                📍 Status:{" "}
                {t.protocolSection.statusModule.overallStatus || "N/A"}
              </p>
              <p>🏥 Source: ClinicalTrials.gov</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
