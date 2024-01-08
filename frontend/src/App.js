import { useRef, useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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

  const GridHeader = () => {
    return (
      <div className={styles.grid}>
        <p className={`${styles.gridItem} ${styles.gridHeader}`}>Country</p>
        <p
          className={`${styles.gridItem} ${styles.gridHeader} ${styles.gridItemRight}`}
        >
          Population
        </p>
        <p
          className={`${styles.gridItem} ${styles.gridHeader} ${styles.gridItemRight}`}
        >
          Percentage
        </p>
      </div>
    );
  };

  const GridElement = ({ name, population_size, percentage_of_total }) => {
    return (
      <div className={styles.grid}>
        <p className={styles.gridItem}>{name}</p>
        <p className={`${styles.gridItem} ${styles.gridItemRight}`}>
          {population_size.toLocaleString("es-AR")}
        </p>
        <p className={`${styles.gridItem} ${styles.gridItemRight}`}>
          {percentage_of_total}
        </p>
      </div>
    );
  };

  return (
    <div className="App">
      <header></header>
      <div className={styles.body}>
        <img src={logo} className={styles.logo} alt="logo" />
        <p>Countries app challenge.</p>
        <div className={styles.form}>
          <p className={styles.inputLabel}>Search countries by name:</p>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={searchTerm}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          {error && <p className={styles.inputError}>{error}</p>}
          <button className={styles.button} onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          {results && results.length > 0 && <GridHeader />}
          {results &&
            results.map((country, index) => (
              <GridElement
                key={index}
                name={country.name}
                population_size={country.population_size}
                percentage_of_total={country.percentage_of_total}
              />
            ))}
          {results && results.length === 0 && (
            <p className={styles.noResults}>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
