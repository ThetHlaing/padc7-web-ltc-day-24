const request = require('request');
const key = require('../keys/weather_info');

const getInfo = async (cityName) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${key}`

    const result = await new Promise((resolve,reject)=>{
        request(url, (err, param, body) => {
            if (err) {
                reject(err);
            }
            else {
                const content = JSON.parse(body);
                
                if(content.cod == 200){
                    const message = `The current temperature of ${cityName} is ${content.main.temp}`
                    resolve({message, weather : content.weather});
                }
                else{
                    reject("City not found");
                }
               
            }
    
        });
    });

    return result;
}

module.exports = { getInfo };