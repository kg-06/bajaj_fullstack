import { useState } from "react";
import axios from "axios";
import "./App.css";

function TreeNode({ data }) {
  return (
    <ul className="tree">
      {Object.entries(data).map(([key, value]) => (
        <li key={key}>
          <span>{key}</span>

          {Object.keys(value).length > 0 && (
            <TreeNode data={value} />
          )}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const nodes = input
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const res = await axios.post(
        "https://bajaj-backend-81fd.onrender.com/bfhl",
        {
          data: nodes,
        }
      );

      setResponse(res.data);
    } catch (err) {
      setError("Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <div className="header">
        <h1>BFHL Hierarchy Analyzer</h1>
        <p>
          Build, inspect and validate hierarchical relationships.
        </p>
      </div>

      <div className="input-card">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`A->B
A->C
B->D`}
        />

        <button onClick={handleSubmit}>
          Analyze Graph
        </button>
      </div>

      {loading && (
        <div className="loading">
          Processing...
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {response && (
        <>
          <div className="stats">

            <div className="stat-card">
              <h2>{response.summary.total_trees}</h2>
              <span>Trees</span>
            </div>

            <div className="stat-card">
              <h2>{response.summary.total_cycles}</h2>
              <span>Cycles</span>
            </div>

            <div className="stat-card">
              <h2>{response.summary.largest_tree_root}</h2>
              <span>Largest Root</span>
            </div>

          </div>

          <div className="results">

            {response.hierarchies.map((item, index) => (
              <div
                key={index}
                className={
                  item.has_cycle
                    ? "hierarchy-card cycle"
                    : "hierarchy-card"
                }
              >

                <h3>Root: {item.root}</h3>

                {item.has_cycle ? (
                  <>
                    <p>⚠ Cycle Detected</p>
                  </>
                ) : (
                  <>
                    <p>Depth: {item.depth}</p>

                    <TreeNode data={item.tree} />
                  </>
                )}

              </div>
            ))}

          </div>

          <div className="extra-info">

            <div className="info-box">
              <h3>Invalid Entries</h3>

              {response.invalid_entries.length === 0
                ? "None"
                : response.invalid_entries.join(", ")}
            </div>

            <div className="info-box">
              <h3>Duplicate Edges</h3>

              {response.duplicate_edges.length === 0
                ? "None"
                : response.duplicate_edges.join(", ")}
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default App;