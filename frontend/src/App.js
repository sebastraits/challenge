import { useRef, useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import { getCountries } from "./Api/api";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const response = await getCountries(searchTerm);
    if (response.error) {
      setResults(null);
      setError(response.error);
      focusAndSelectInput();
    } else {
      setResults(response.data);
    }
    setIsLoading(false);
  };

  const Grid = () => {
    return (
      <>
        <GridHeader />
        {results.map((country, index) => (
          <GridElement
            key={index}
            name={country.name}
            population_size={country.population_size}
            percentage_of_total={country.percentage_of_total}
          />
        ))}
      </>
    );
  };

  const GridHeader = () => {
    const label1 = "Country";
    const label2 = "Population";
    const label3 = "% of total";
    return (
      <div className={styles.grid}>
        <p className={`${styles.gridItem} ${styles.gridHeader}`}>{label1}</p>
        <p
          className={`${styles.gridItem} ${styles.gridHeader} ${styles.gridItemRight}`}
        >
          {label2}
        </p>
        <p
          className={`${styles.gridItem} ${styles.gridHeader} ${styles.gridItemRight}`}
        >
          {label3}
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

  const GridNoResults = () => {
    return <p className={styles.noResults}>No results found.</p>;
  };

  return (
    <div className="App">
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
        <div className={styles.gridContainer}>
          {isLoading && <span className={styles.isLoading}/>}
          {results && (results.length > 0 ? <Grid /> : <GridNoResults />)}
        </div>
      </div>
    </div>
  );
}

export default App;
