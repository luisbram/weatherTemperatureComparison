import WeatherVerifier from "../pages/WeatherVerifier"

describe("example test", ()=>{
    let weatherVerifier  = new WeatherVerifier();
    let jestTimeout = 65000;

test("growth deel training form test", async()=>{
    const googleLocationTemp = await weatherVerifier.getCurrentWeather("Guadalajara");
    const weatherAPITemp = await  weatherVerifier.getLocationTemperatureFromWeatherAPI("20.659698","-103.349609");
    console.log("temperature according to google => ["+googleLocationTemp+"]");
    console.log("temperature according to the weather api => ["+weatherAPITemp+"]");
    expect(googleLocationTemp).toEqual(weatherAPITemp)

},jestTimeout)

});