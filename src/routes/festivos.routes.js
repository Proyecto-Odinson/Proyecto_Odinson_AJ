const express = require('express');
const router = express.Router();

const {  renderCreateFestivo, crearFestivo, findFestivos } = require('../controllers/festivos.controllers');
const {  isLoggedIn, role } = require ('../middlewares/auth')

router.get('/registrar_festivo', isLoggedIn, role(), renderCreateFestivo  )
router.post('/registrar_festivo', isLoggedIn, role(), crearFestivo )

router.get ('/festivos' , isLoggedIn, role(), findFestivos)


module.exports = router;




