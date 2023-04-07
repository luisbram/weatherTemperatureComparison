export default class WeatherVerifier{

    constructor(){
        this.celciusTemperatureText = "#search h2 + div > div:nth-of-type(1) > div[role='heading'] > div > div:first-of-type > span[style='display:inline']";
       // "#search div[role='heading'] span[style='display:inline']:not(span[role='button'])";
        this.inputSearch = "input[name='q']";
    }

    async getCurrentWeather(weatherLocation){
        const url = "https://www.google.com";
        await page.goto(url);
        page.waitForNavigation()
        await page.type(this.inputSearch ,"weather of "+weatherLocation,{delay: 100});
        await page.keyboard.press("Enter");
        await page.waitForTimeout(2000); 
        let locationTemperature = await page.$eval(this.celciusTemperatureText,el => parseInt(el.textContent));
        locationTemperature += 273.15;
        return locationTemperature;
    }

    async getLocationTemperatureFromWeatherAPI(lat,lon){
        await page.setRequestInterception(true);
        page.on('request', interceptedRequest => {
            var data = {
                'method': 'GET'
            };
            interceptedRequest.continue(data);
        });
        const response = await page.goto(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4607e7c38c1ad74a788c779110a3e50b`);     
        const responseBody = await response.text();
        const obj = JSON.parse(responseBody);
        return obj.main.temp;
    }
}