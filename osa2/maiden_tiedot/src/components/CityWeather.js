import React, {useState, useEffect} from 'react';
import {SmallCaption} from "./Caption";
import axios from 'axios';

const CityWeather = ({country}) => {

    const [weather, setWeather] = useState({});

    const fetchWeather = () => {
        const apiKey = '';
        const url = `https://api.apixu.com/v1/current.json?key=${apiKey}&q=${country.capital}`;

        axios.get(url)
            .then(resp => {
                console.log(resp.data);
                setWeather(resp.data);
            }).catch(err => {
                console.log('Error getting weather data from api.apixu.com. Check API key!!');
                setWeather({});
        })
    };

    useEffect(fetchWeather, []);

    const isSet = () => Object.keys(weather).length > 0;

    if (!isSet()) {
        console.log("Weather information not fetch yet!!");
        return (<></>)
    }

    return (
        <div>
            <SmallCaption caption={`Weather in ${country.capital}`} />
            <p><b>Temperature:</b> {weather.current.feelslike_c} celcius</p>
            <p><img src = {`https:${weather.current.condition.icon}`} /></p>
            <p><b>Wind: </b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
        </div>
    )
};

export default CityWeather;