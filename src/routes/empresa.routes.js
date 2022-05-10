const express = require('express');
const router = express.Router();

const { findEmpresas, renderCreateEmpresa, crearEmpresa } = require('../controllers/empresa.controllers');
const { isLoggedIn, role} = require('../middlewares/auth');

router.get('/empresas', isLoggedIn, role(), findEmpresas)

router.get('/registrar_empresa', isLoggedIn, role(), renderCreateEmpresa  )
router.post('/registrar_empresa', isLoggedIn, role(), crearEmpresa )

module.exports = router;

