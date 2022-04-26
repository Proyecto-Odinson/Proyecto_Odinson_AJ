require('dotenv').config(); //Importamos la funcion config de dotenv que puede leer archivos .env
const express = require('express'); //Constante express que le importamos express
const { create } = require('express-handlebars'); // Configiracion de Handlebars para vistas
/**
 * Path es para manejar rutas, y join es para formatear la ruta en el formato del S.O. en uso
 * Ej join('carpeta_padre', 'carpeta_hija')
 * Windows: carpeta_padre\carpeta_hija
 * Linux: carpeta_padre/carpeta_hija
 */
// Join une dos rutas poniendo la barra correspondiente al S.O. en uso
const {join} = require('path'); 
const flash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const db = require('./database'); //Variable db que tendra el valor del archivo database

const app = express(); //Variable app que sera igual a la funcion express

require ('./config/passport')

const UserRoutes = require('./routes/user.routes');

const {isLoggedIn} = require('./middlewares/auth')
//Config de Handlebars

// Configs
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

app.use (express.json()); //Config de Express para POST
app.use(express.urlencoded({
extended: false
}))
app.use (express.static(join(__dirname,'public'))) //DEFINICION  DE RUTA PUBLIC
app.use(flash());
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


/*


const Province = require('./models/provinces');
const City = require('./models/cities');
const req = require('express/lib/request');
const res = require('express/lib/response');



//ROUTES POST




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

//CONF ROUTES

app.use('/', UserRoutes)
const router = express.Router();

router.get('/', isLoggedIn, (req,res) => {
    res.render('home')
})

app.use('/', router);

// Errores
app.use('*',(req,res) =>  {
    res.render('error/404.hbs');
})

// Iniciar servidor
app.listen(app.get('port'));
console.log ('Escuchando el puerto', app.get('port'));