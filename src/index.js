require('dotenv').config();

//Constantes a declarar para que tome el index
const express = require('express');

//const MongoStore = require ('connect-mongo');
const db = require('./database');

const {create } = require('express-handlebars')

const {join} = require('path')


const app = express();

//Config de Handlebars

const hbs = create ({
    partialsDir: join(__dirname, 'views', 'partials'),
    layoutsDir: join(__dirname, 'views', 'layout'), 
    defaultLayout: 'main.hbs',
    extname: '.hbs',
})

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set ('views', join(__dirname, 'views'))


console.log ("Mensaje de prueba");

const router = express.Router();

const Province = require('./models/provinces');
const City = require('./models/cities');
const req = require('express/lib/request');
const res = require('express/lib/response');

router.get ('/', (req,res) => {

    res.render ('index')

}) 

router.get('/provinces', async (req, res) => {

    const provinces = await Province.find();

    res.json(provinces);
})

router.get('/cities', async (req, res) => {
    const cities = await City.find();

    res.json(cities);
})

router.get('/cities/:id', async (req, res) => {

    const provinceId=req.params.id;
    const cities = await City.find({ province: provinceId });

    res.json(cities);
})

app.use('/', router);

//Conexion al servidor web

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));
console.log ('Escuchando el puerto', app.get('port'));

