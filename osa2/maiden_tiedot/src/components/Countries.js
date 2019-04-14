import React from 'react';
import {Caption, SmallCaption} from "./Caption";

const Country = ({country}) => {
    console.log(country);
    return (
        <li>{country.name} </li>
    )
};

const CountryDetail = ({country}) => {
    return (
        <>
            <Caption caption={country.name}/>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <SmallCaption caption="Languages"/>
            <Languages languages={country.languages} />
            <img src={country.flag} width="100" height="50" alt="flag" />
        </>
    );
};

const Languages = ({languages}) => {
  return(
      <ul>
          {languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
  )
};

const Countries = ({countries, countryFilter}) => {

    const countryList = () => {

        let filterFn = (person) => true;

        if (countryFilter.length > 0) {
            filterFn = (country) => {
                const val = country.name.toLowerCase().includes(countryFilter.toLocaleLowerCase());
                console.log(country, val);
                return val;
            }
        }

        const filteredCountries = countries.filter(country => filterFn(country));

        if (filteredCountries.length === 0) {
            return (<p>Ei tuloksia</p>)
        } else if (filteredCountries.length > 1) {
            return (
                <>
                    <Caption caption="Maat"/>
                    <ul>
                        {filteredCountries.map(country => {
                            console.log(country);
                            return <Country key={country.alpha2Code} country={country}/>
                        })}
                    </ul>
                </>)
        } else {
            return (
                <CountryDetail country={filteredCountries[0]}/>
            )
        }
    };

    return (
        <div>
            {countryList()}
        </div>
    )
};

export default Countries;