const FCT = require("../models/FCT");
const { Profesor, Alumno } = require('../models/Users');
const Empresa = require ('../models/empresa');

const renderCreateFCT =  async (req, res) => {
    const empresas = await Empresa.find().lean();
    res.render('registrar_FCT' , {empresas} );
}

//CREACION DE FCT

const crearFCT = async (req, res) => {
    const { alumno, empresa , tutor_laboral, tutor_profesor, trimestre, horas, cargo, fecha_inicio, fecha_final   } = req.body;

    const fct = await FCT.findOne({ alumno });
    console.log(fct)

    if(fct) {
        req.flash('error', 'La FCT ya fue registrada');
        return res.redirect('registrar_FCT');
    }

    const newFCT = FCT ({

        alumno,
        empresa ,
        tutor_laboral,
        tutor_profesor,
        trimestre,
        horas,
        cargo, 
        fecha_inicio,
        fecha_final,
    });

    try {
        await newFCT.save();
        req.flash('success', 'Se ha guardado la FCT correctamente.');
        console.log(newFCT)
        return res.redirect('/alumnos_FCT ');
        
    } catch (error) {
        req.flash('error', 'No se ha podido guardar la FCT');
        console.log(error)
        return res.redirect('/registrar_FCT');
    }


}


// FUNCIONES

const findFCT = async (req, res) => {

    const fct = await FCT.find().lean();

    res.render('alumnos_FCT', { fct });
}

const findProfesFP = async (req, res) => {

    const findProfes = await Profesor.find({tipo_clase: 'FP' })
    res.json(findProfes);
}

const findAlumnos2ºFP = async (req, res ) => {

    const findAlumnos2ºFP = await Alumno.find({ etapa: idETAPA , curso })
    
    res.json(findAlumnos2ºFP)
}


module.exports = {
    
    findFCT,
    crearFCT,
    renderCreateFCT,
    findProfesFP,
    findAlumnos2ºFP,
    
}
