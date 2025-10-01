import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSwapiPerson, clearData } from "./swapiReducer";
import "./App.css";

function App() {
  const { data, person, isLoading, error } = useSelector((state) => state.swapi);
  const dispatch = useDispatch();
  const [personId, setPersonId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!personId.trim()) return;
    dispatch(fetchSwapiPerson(personId));
  };

  const handleClear = () => {
    dispatch(clearData());
    setPersonId("");
  };

  return (
    <div>
      <h1>SWAPI People</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          value={personId}
          onChange={(e) => setPersonId(e.target.value)}
          placeholder="Введи id"
        />
        <button type="submit">Get info</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* один персонаж */}
      {person && (
        <div>
          <h2>{person.name}</h2>
          <pre>{JSON.stringify(person, null, 2)}</pre>
        </div>
      )}

      {/* список персонажів */}
      {data.length > 0 && (
        <ul>
          {data.map((char, index) => (
            <li key={index}>
              <pre>{JSON.stringify(char, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}

      <footer style={{ marginTop: "20px" }}>
        <button onClick={handleClear} >Clear</button>
      </footer>
    </div>
  );
}

export default App;
