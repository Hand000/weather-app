// Base URL = http://api.weatherapi.com/v1
// API Key : 3c94b1f5cdf048e89ff164418242504

import fetch from 'node-fetch';

export async function getWeather() {
    const response = await fetch('http://api.weatherapi.com/v1/current.json?' + new URLSearchParams({
        key: '3c94b1f5cdf048e89ff164418242504',
        q: 'Cambridge',
        aqi: 'no'
    }));
    console.log(response);
    const data = await response.json();
    
    return data;
}