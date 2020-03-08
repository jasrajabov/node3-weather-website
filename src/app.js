const path      = require('path')
const express   = require('express')
const hbs       = require('hbs')
const geocode   = require('./utils/geocode')
const forecast   = require('./utils/forecast')

const app       = express()

//this is just for view/test the pathname
console.log(path.join(__dirname,'../public'))

//define paths for Express config
const publicDirPath     = path.join(__dirname,'../public')
const viewsPath         = path.join(__dirname,'../temps/views')
const partialsPath      = path.join(__dirname,'../temps/partials')

//setup handlebars engine and views location (to change views folder to temps because express expects views always)
app.set('view engine','hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

//setup staticDir to serve
app.use(express.static(publicDirPath))

//expressjs.com for documentation

app.get('',(req, res) => {      //this is for index page (root), dynamic temp 
    res.render('index', {
        title: 'Weather',
        name: 'Jas R.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        description: 'This is a page about me',
        name: 'Jas R.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'How can we help?',
        name: 'Jas R.'
        //description: 'This is a page about me'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address)  {
        return res.send({
            error: "Enter an address!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, locationName} = {}) => {

        if (error) {
            return res.send(error)  // return stops the execution
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                res.send(error)
            }
            res.send({'location': locationName, 
                      'forecast': forecastData,
                      'address': req.query.address})
    
          })
    })
    })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Jas R.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Jas R.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})