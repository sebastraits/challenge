import { useRef, useState } from "react";
import logo from "./logo.svg";
import classes from "./App.module.css";
import { getCountries } from "./Api/api";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const inputRef = useRef();

  const focusAndSelectInput = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  const handleSearch = async () => {
    setError(undefined);
    const response = await getCountries(searchTerm);
    if (response.error) {
      setResults(null);
      setError(response.error);
      focusAndSelectInput();
    } else {
      setResults(response.data);
    }
  };

  return (
    <div className="App">
      <header></header>
      <div className={classes.body}>
        <img src={logo} className={classes.logo} alt="logo" />
        <p>Countries app challenge.</p>
        <div className={classes.form}>
          <p className={classes.inputLabel}>Search countries by name:</p>
          <input
            ref={inputRef}
            className={classes.input}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          {error && <p className={classes.inputError}>{error}</p>}
          <button className={classes.button} onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          {results && results.map((result, index) => (
            <div className={classes.grid} key={result.name}>
              <p className={classes.gridItemName}>{result.name}</p>
              <p className={classes.gridItem}>
                Population: {result.population_size.toLocaleString("es-AR")}
              </p>
              <p className={classes.gridPorcentaje}>
                {result.percentage_of_total}%
              </p>
            </div>
          ))}
          {results && results.length === 0 && (
             <p className={classes.noResults}>No results found.</p>
            )  
          }
        </div>
      </div>
    </div>
  );
}

export default App;
