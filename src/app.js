const express = require('express')
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather App'
    })
})  

app.get('/about', (req, res) => {
    res.render('about', {

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is the help page!'
    })
})

app.get('/weather', (req, res) => {
    if(req.query.search) {
        return res.send( {
            error: 'You need to enter a location!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send( {
            error: 'You must provide a search term'
        })
    }
    res.send( {
        products:[]
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

