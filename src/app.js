const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// route handlers
app.get('',(req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Siddharth'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Siddharth'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Siddharth',
        message: 'Please contact us at 1239213213'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (forecastError, forecastData) => {
            debugger
            if(error) return res.send({ error })
            res.send({
                location: location,
                forecast: forecastData.forecast,
                temp: forecastData.temperature,
            })
        });
    })
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        message: 'Help article not found.',
        name: 'Siddharth'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page Not Found.',
        name: 'Siddharth'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000.');
})