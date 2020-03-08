const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiaWRsZ2ciLCJhIjoiY2s1a2Q2ajVzMGN5MjNrbjU3cDR0aHZpNSJ9.cmyGz9STPjMVMPkXFULpkA&limit=1'
    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to the server!', undefined)
        }
        else if (body.features.length == 0) {
            callback({error:'No matching results found!'}, undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0], 
                locationName: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode