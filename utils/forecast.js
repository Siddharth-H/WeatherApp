const request = require('request')

const forecast = ( latitude,longitude, callback) =>{
    const url ="http://api.weatherstack.com/current?access_key=bf66dee4db9e72f13e83707eaa98ec34&query="+ latitude+","+longitude;
    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Low Level Error')
        }
        else if(body.success === false){
            callback('Coordinate Error')
        }
        else{
            callback(undefined, {
                forecast: body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out." +
                " The humidity is " + body.current.humidity + "%.",
                location: body.location.name + ", " + body.location.region + ", " + body.location.country,
                temperature: body.current.temperature
            })
        }
    })
}

module.exports = forecast