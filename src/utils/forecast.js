const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9f04366cd0c999cfb1805fccba7d4b46&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json:true}, (error, response) => {

        if(error) {
            callback('Unable to connect to the internet!', undefined)
        }else if(response.body.error) {
            callback('Unable to find the forecast!', undefined)
        }else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees. It feels like ' + response.body.current.feelslike + ' degrees out here')
        }

    })
}

module.exports = forecast