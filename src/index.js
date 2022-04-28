require('dotenv').config(); //Importamos la funcion config de dotenv que puede leer archivos .env
const express = require('express'); //Constante express que le importamos express
const { create } = require('express-handlebars'); // Configiracion de Handlebars para vistas donde create se le importa el valor de express-handlebars
/**
 * Path es para manejar rutas, y join es para formatear la ruta en el formato del S.O. en uso
 * Ej join('carpeta_padre', 'carpeta_hija')
 * Windows: carpeta_padre\carpeta_hija
 * Linux: carpeta_padre/carpeta_hija
 */
// Join une dos rutas poniendo la barra correspondiente al S.O. en uso
const {join} = require('path'); 
const flash = require('connect-flash'); //Flash lo usaremos para avisos y alertas dependiendo del usuario
const passport = require('passport'); // Importaremos passport a la variable passport, esto lo usaremos para la autenticacion del usuario
const MongoStore = require('connect-mongo'); // Crearemos la variable Mongostore que tendra el valor de connect-mongo, su uso sera para poder conectar a la BD Mongo
const session = require('express-session'); // Crearemos la variable sessions que tendra el valor de express-session,  lo usaremos para las sesiones de los usuarios
const db = require('./database'); //Variable db que tendra el valor del archivo database 
const app = express(); //Variable app que sera igual a la funcion express
require ('./config/passport') // Importaremos el archivo passport, que contiene la autenticacion
const UserRoutes = require('./routes/user.routes'); // Importaremos a UserRoutes la configuracion del archivo user.routes 
const ProvincesRoutes = require('./routes/province.routes');

//Config de Handlebars
const hbs = create ({
    partialsDir: join(__dirname, 'views', 'partials'),
    layoutsDir: join(__dirname, 'views', 'layouts'), 
    defaultLayout: 'main.hbs',
    extname: '.hbs',
})

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.set ('views', join(__dirname, 'views'))
app.set('port', process.env.PORT || 3000)


// Middlewares 

//Config de Express para POST

app.use (express.json()); 
app.use(express.urlencoded({
extended: false
}))

//DEFINICION  DE RUTA PUBLIC

app.use (express.static(join(__dirname,'public'))) 
app.use(flash());

// CONF SESIONES

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        client: db.getClient()
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8 * 1
    }
}))

app.use(passport.initialize());
app.use(passport.session());

// Variables Globales
app.use((req, res, next) => {
    app.locals.user = req.user;
    app.locals.loggedIn = req.user ? true : false;
    app.locals.errorMsg = req.flash('error');
    app.locals.successMsg = req.flash('success');
    app.locals.infoMsg = req.flash('info');
    app.locals.warningMsg = req.flash('warning');
    next();
})

//CONF ROUTES

app.use('/', UserRoutes);
app.use('/', ProvincesRoutes);

// Errores
app.use('*',(req,res) =>  {
    res.render('error/404.hbs');
})

// Iniciar servidor
app.listen(app.get('port'));
console.log ('Escuchando el puerto', app.get('port'));



/*

const Province = require('./models/provinces');
const City = require('./models/cities');
const req = require('express/lib/request');
const res = require('express/lib/response');


//ROUTES GET PARA INDEX

router.get ('/', (req,res) => {

    res.render ('index', {

        layout: 'vacio'
    })

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

*/