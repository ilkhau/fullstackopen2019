import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Filter from './components/Filter';
import Countries from "./components/Countries";

const App = () => {

  const [countryFilter, setCountryFilter] = useState('');
  const [countries, setCountries] = useState([]);

  const countryFilterChanged = (event) => {
    console.log(`Filter: ${event.target.value}`);
    setCountryFilter(event.target.value);
    fetchCountries();
  };

  const fetchCountries = () => {
    const url = 'https://restcountries.eu/rest/v2/all';
    console.log(`Fetching country information from ${url}`);
    axios
        .get(url)
        .then(response => {
          console.log('promise fulfilled')
          setCountries(response.data)
        })
  };

  useEffect(fetchCountries, []);

  return(

      <div>
        <Filter text="Find countries: " val={countryFilter} changeHandler={countryFilterChanged}/>
        <Countries countries={countries} countryFilter={countryFilter}/>
      </div>
  )
};

export default App;
