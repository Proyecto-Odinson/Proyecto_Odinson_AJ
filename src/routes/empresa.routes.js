const express = require('express');
const router = express.Router();

const { findEmpresas, findEmpresasByID, renderCreateEmpresa, crearEmpresa, renderModificarEmpresa, updateEmpresa, deleteEmpresa } = require('../controllers/empresa.controllers');
const { isLoggedIn, role} = require('../middlewares/auth');

// LISTADO DE EMPRESAS 

router.get('/empresas', isLoggedIn, role(), findEmpresas);
router.get('/empresa/:id', isLoggedIn, role(), findEmpresasByID);

// CREAR EMPRESA

router.get('/registrar_empresa', isLoggedIn, role(), renderCreateEmpresa);
router.post('/registrar_empresa', isLoggedIn, role(), crearEmpresa );

// ELIMINACION Y MODIFICACION DE EMPRESAS

router.get('/mod_empresa/:id', isLoggedIn, role(), renderModificarEmpresa)
router.put('/mod_empresa/:id', isLoggedIn, role(), updateEmpresa)
router.delete('/empresas' , isLoggedIn, role(), deleteEmpresa)

module.exports = router;

