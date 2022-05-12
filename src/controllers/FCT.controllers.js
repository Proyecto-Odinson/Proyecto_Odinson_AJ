const FCT = require("../models/FCT");
const { User, Profesor, Alumno } = require('../models/Users');
const Empresa = require ('../models/empresa');

const renderCreateFCT =  async (req, res) => {
    const empresas = await Empresa.find().lean();
    const alumno = await Alumno.find().lean();
    res.render('registrar_FCT' , {empresas} , {alumno} );
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


module.exports = {
    
    findFCT,
    crearFCT,
    renderCreateFCT,
    
}
