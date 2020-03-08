const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/78a237bb5c5850cb9a9b157794219c27/'+latitude.toString()+','+longitude.toString()+'?units=si'
    request({url,json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if (body.error) {
            callback('Unable to locate the coordinates', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees outside.' + ' There is a ' + body.currently.precipProbability + '% of rain.')
        }
    })
  }

  module.exports = forecast