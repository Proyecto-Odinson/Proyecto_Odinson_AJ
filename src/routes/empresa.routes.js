const express = require('express');
const router = express.Router();

const { findEmpresas, findEmpresasByID, renderCreateEmpresa, crearEmpresa, renderModificarEmpresa, updateEmpresa, deleteEmpresa } = require('../controllers/empresa.controllers');
const { isLoggedIn } = require('../middlewares/auth');

// LISTADO DE EMPRESAS 

router.get('/empresas', isLoggedIn, findEmpresas);
router.get('/empresa/:id', isLoggedIn, findEmpresasByID);

// CREAR EMPRESA

router.get('/registrar_empresa', isLoggedIn, renderCreateEmpresa);
router.post('/registrar_empresa', isLoggedIn, crearEmpresa );

// ELIMINACION Y MODIFICACION DE EMPRESAS

router.get('/mod_empresa/:id', isLoggedIn,  renderModificarEmpresa)
router.put('/mod_empresa/:id', isLoggedIn, updateEmpresa)
router.delete('/empresas' , isLoggedIn, deleteEmpresa)

module.exports = router;

