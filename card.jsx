import React from 'react';
import axios from 'axios';
import exampleApi from "./exampleApi.json"
import { useState, useEffect } from "react";

const apiKey = "3915c49f28ee9da20c64d46ea2eb931d";


function card() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const succes = position => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                .then(res => setWeather(res.data)
                );

        }
        navigator.geolocation.getCurrentPosition(succes)
    }, []);

    const [temp, setTemp] = useState([0, "°C"]);

    useEffect(() => {
        setTemp([Math.round(weather?.main.temp) - 273.15, "°C"]);

    }, [weather?.main.temp, weather?.weather[0].description])

    const handleTemperature = () => {
        let value = 0;
        if (temp[1] === "°C") {
            value = (temp[0] * (9 / 5)) + 32;
            setTemp([Math.round(value), "°F"]);
        } else {
            value = (temp[0] - 32) / 1.8;
            setTemp([Math.round(value), "°C"]);
        };
    };
    const temperature = temp[0].toFixed(0);

    const image = `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`;
    return (

        <div className='conteiner'>
            <div className='cardConteiner'>
                <h1><strong>Wheather App</strong></h1>
                <p className='city'>{weather?.name},{weather?.sys.country}</p>
                <div className='iconWh'>
                    <img src={image} alt='' />
                </div>
                <p className='cardTemp'>{temperature + temp[1]}</p>
                <button onClick={handleTemperature} className='buttonChange'>{temp[1] === "°C" ? ("Change to °F") : ("Change to °C")}</button>
            </div>
            <div className='cardMoreData'>
                <div className='windSeed'>
                    <p>Wind speed</p>
                    <i class="fi fi-br-wind"></i><br />{weather?.wind.speed}m/s</div>
                <div className='pressure'><p>Atmospheric pressure</p> <i class="fi fi-sr-sunrise-alt"></i> <br />{weather?.main.pressure}hPa</div>
                <div className='clouds'> <p>Clouds</p><i class="fi fi-sr-smoke"></i><br />{weather?.clouds.all}%</div>

            </div>
        </div>
    );
}

export default card;