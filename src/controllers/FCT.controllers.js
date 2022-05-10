const FCT = require("../models/FCT");
const { User, Profesor, Alumno } = require('../models/Users');
const Empresa = require ('../models/empresa');

const renderCreateFCT =  async (req, res) => {
    const empresas = await Empresa.find().lean();
    res.render('registrar_FCT' , {empresas} );
}

//CREACION DE EMPRESAS

const crearFCT = async (req, res) => {
    const {    } = req.body;

    const fct = await Alumno.findOne({ username });
    console.log(fct)

    if(fct) {
        req.flash('error', 'La FCT ya fue registrada');
        return res.redirect('registrar_empresa');
    }

    const newFCT = FCT ({

        
    });

    try {
        await newFCT.save();
        req.flash('success', 'Se ha guardado la empresa correctamente.');
        console.log(newFCT)
        return res.redirect('/empresas');
        
    } catch (error) {
        req.flash('error', 'No se ha podido guardar la empresa');
        console.log(error)
        return res.redirect('/registrar_empresa');
    }


}


// FUNCIONES

const findFCT = async (req, res) => {

    const fct = await FCT.find().lean();

    res.render('fct', { fct });
}


module.exports = {
    
    findFCT,
    crearFCT,
    renderCreateFCT,
    
}
