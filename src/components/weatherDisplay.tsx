import React from 'react';

import './weather.css';

import menuIcon from '../img/burger-bar.png';

interface WeatherProps {

}

interface WeatherState {
    weatherData: any;
    currentCity: string;
    background: string;
    menuActive: boolean;
}

/**
 * WeatherDisplay: 
 *      Displays the weather for a number of cities based on data reiceved from WeatherAPI.com.
 * 
 * props: none
 * state: 
 *      weatherData: Current weather data recieved from API in JSON format.
 *      currentCity: City currently being viewed.
 *      background: Background image for upper part of display.
 *      menuActive: Determines if city selection menu is open.
 */
export default class WeatherDisplay extends React.Component<WeatherProps, WeatherState> {
    constructor(props: WeatherProps) {
        super(props)

        this.state = {
            weatherData: null,
            currentCity: "Cambridge",
            menuActive: false, 
            background: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Cambridge_centre_map.png'
        }

        this.getData = this.getData.bind(this)
    }

    async componentDidMount() {
        this.getData();
    }

    async componentDidUpdate(prevProps: Readonly<WeatherProps>, prevState: Readonly<WeatherState>, snapshot?: any) {
        if (prevState.currentCity != this.state.currentCity) {
            this.getData();
        }
    }

    render() {
        const weatherData = this.state.weatherData;

        return this.state.weatherData ? <div className='weather-display'>
            <div className="weather-title"> 
                <strong>{weatherData.location.name}</strong>, {weatherData.location.country}
                <div id='burger-menu'>
                    <img id='burger-icon' src={menuIcon} onClick={() => {this.setState({...this.state, menuActive: true })}}/>
                    <div id='nav-menu' style={{ display: this.state.menuActive ? 'block' : 'none' }}>
                        <div id='nav-close' onClick={() => {this.setState({...this.state, menuActive: false })}}>x</div>
                        <div id='nav-options'>
                            <div className='nav-option'
                                onClick={() => { this.setState({ ...this.state, menuActive: false, currentCity: 'Cambridge', background: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Cambridge_centre_map.png' })}}>Cambridge</div>
                            <div className='nav-option' 
                                onClick={() => { this.setState({ ...this.state, menuActive: false, currentCity: 'Manchester', background: 'https://gisgeography.com/wp-content/uploads/2023/02/Manchester-Road-Map.jpg' })}}>Manchester</div>
                            <div className='nav-option' 
                                onClick={() => { this.setState({ ...this.state, menuActive: false, currentCity: 'London', background: 'https://t3.ftcdn.net/jpg/02/94/88/24/360_F_294882489_pSlBaLibFSUdV15VfCAmC31x7Ws20Puf.jpg' })}}>London</div>
                            <div className='nav-option' 
                                onClick={() => { this.setState({ ...this.state, menuActive: false, currentCity: 'Leicester', background: 'https://i2-prod.leicestermercury.co.uk/news/article4279875.ece/ALTERNATES/s1200c/2_Leicester-C-19-lockdown-boundaries-including-city.jpg' })}}>Leicester</div>
                        </div>   
                    </div>
                </div>
            </div>
            <div className="weather-top" style={{
                backgroundImage: `url(${this.state.background})`
            }}>
                <div className='temperature'> Temp {weatherData.current.temp_c}&deg; (Feels like: {weatherData.current.feelslike_c}&deg;) </div>
            </div>
            <div className="weather-bottom">
                <div className="weather-body">   
                    <div> <img src={weatherData.current.condition.icon}/>{weatherData.current.condition.text} </div>
                    <div> Cloud coverage: {weatherData.current.cloud}% </div>
                    <div> Precipitation(mm): {weatherData.current.precip_mm} </div>
                </div>
            </div>
        </div> : <></>
    }

    async getData() {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?' + new URLSearchParams({
            key: '3c94b1f5cdf048e89ff164418242504',
            q: this.state.currentCity,
            aqi: 'no'
        }));
        this.setState({
            ...this.state,
                weatherData: await response.json()
        })
        setTimeout(this.getData, 60000);
    }
}