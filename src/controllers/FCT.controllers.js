const FCT = require("../models/FCT");
const { Profesor, Alumno } = require('../models/Users');
const Empresa = require ('../models/empresa');
const { $where, populate } = require("../models/FCT");
const { default: mongoose } = require("mongoose");

const renderCreateFCT =  async (req, res) => {
    const empresas = await Empresa.find().lean();
    res.render('registrar_FCT' , {empresas} );
}

//CREACION DE FCT

const crearFCT = async (req, res) => {
    const { alumno, empresa , tutor_laboral, tutor, trimestre, horas, cargo, fecha_inicio, fecha_final   } = req.body;

    console.log(req.body)

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
        tutor,
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
        return res.redirect('/alumnos_FCT');
        
    } catch (error) {
        req.flash('error', 'No se ha podido guardar la FCT');
        console.log(error)
        return res.redirect('/registrar_FCT');
    }


}


// FUNCIONES

const findFCT = async (req, res) => {

    const fct = await FCT.find().populate('tutor').populate('empresa').populate('alumno').lean();

    res.render('alumnos_FCT', { fct });
}

const findProfesFP = async (req, res) => {

    const findProfes = await Profesor.find({tipo_clase: 'FP' })
    res.json(findProfes);
}

const findAlumnos2ºFP = async (req, res ) => {

    let findAlumnos2ºFP = await Alumno.aggregate([
        {
            $match: {
                $or: [
                    { etapa: mongoose.Types.ObjectId('6278be304cb3b9aee798fb70') },
                    { etapa: mongoose.Types.ObjectId('6278be304cb3b9aee798fb71') }
                ]
            }
        },
        {
            $lookup: {

                from: 'asignaturas',
                foreignField: '_id',
                localField: 'asignaturas',
                as: 'asignaturas'
            }
        },

        {
            $match: {
                'asignaturas.curso' : 2,
            }
        },
    ])

    

    res.json(findAlumnos2ºFP)
};

module.exports = {
    
    findFCT,
    crearFCT,
    renderCreateFCT,
    findProfesFP,
    findAlumnos2ºFP,
    
}
