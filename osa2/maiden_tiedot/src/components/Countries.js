import React, {useState} from 'react';
import {Caption, SmallCaption} from "./Caption";
import Button from "./Button.cs";

const Country = ({country, details}) => {
    console.log(country);

    return (
        <li>
            {country.name}
            <Button text="show" handler={details}/>
        </li>
    )
};

const CountryDetail = ({country}) => {
    return (
        <>
            <Caption caption={country.name}/>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <SmallCaption caption="Languages"/>
            <Languages languages={country.languages}/>
            <img src={country.flag} width="100" height="50" alt="flag"/>
        </>
    );
};

const Languages = ({languages}) => {
    return (
        <ul>
            {languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
        </ul>
    )
};

const Countries = ({countries, countryFilter, activateCountry}) => {

    const activeCountrySelected = (country) => (event) => {
        console.log(`Active country selected: ${country.name}`);
        event.preventDefault();
        activateCountry(country);
    };

    const countryList = () => {

        let filterFn = (country) => true;

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
                            return (
                                <div>
                                    <Country key={country.alpha2Code} country={country}
                                             details={activeCountrySelected(country)}/>
                                </div>)
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