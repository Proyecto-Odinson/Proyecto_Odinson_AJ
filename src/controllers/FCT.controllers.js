const FCT = require("../models/FCT");
const { Profesor, Alumno } = require('../models/Users');
const Empresa = require ('../models/empresa');
const Asignatura = require('../models/asignaturas');
//const { $where, populate } = require("../models/FCT");
const { default: mongoose } = require("mongoose");
const fct = require("../models/FCT");
const etapa = require('../models/etapa');

// RENDER PARA CREAR FCT

const renderCreateFCT =  async (req, res) => {
    const empresas = await Empresa.find().lean();
    res.render('registrar_FCT' , {empresas} );
}

// RENDER PARA MODIFICAR FCT

const renderModifyFCT =  async (req, res) => {

    const fctID = req.params.id;
    const FCT = await fct.findById(fctID).lean();
    res.render('mod_FCT' , {FCT})
}

//CREACION DE FCT

const crearFCT = async (req, res) => {
    const { alumno, empresa , tutor_laboral, tutor, trimestre, horas, fecha_inicio, fecha_final   } = req.body;

    console.log(req.body)

    const fct = await FCT.findOne({ alumno });
    console.log(fct)

    if(fct) {
        req.flash('error', 'La FCT ya fue registrada con dicho alumno');
        return res.redirect('registrar_FCT');
    }

    const newFCT = FCT ({

        alumno,
        empresa ,
        tutor_laboral,
        tutor,
        trimestre,
        horas,
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

// MODIFICACION FCT

const updateFCT = async (req, res) => {

    const fctId = req.params.id;
    const updatedFCT = await fct.updateOne({ _id: fctId}, req.body);

    console.log( updatedFCT);
    res.redirect('/alumnos_FCT')
}
 
// BORRAR FCT

const deleteFCT = async ( req, res ) => {

    try {
        const deleteFCT = await fct.deleteOne ( { _id: req.body.fct } )
        req.flash('success', 'Se ha borrado la FCT.');
        console.log(deleteFCT)
        return res.redirect('/alumnos_FCT');
    } catch (error) {
        req.flash('error', 'No se ha podido borrar la FCT');
        console.log(error)
        return res.redirect('/alumnos_FCT');
    }
}


// FUNCIONES

const findFCT = async (req, res) => {

    const fct = await FCT.find().populate('tutor').populate('empresa').populate('alumno').lean();

    res.render('alumnos_FCT', { fct });
}

const findProfesFP = async (req, res) => {

    let etapas_fp = await etapa.find({ $or: [{ nombre: 'GRADO_MEDIO' }, { nombre: 'GRADO_SUPERIOR' }]});
    etapas_fp = etapas_fp.map(etapa => etapa._id);
    const asignaturas_fp = await Asignatura.find({
        etapa: { $in: etapas_fp},
        curso: 2
    }).populate('profesor');
    
    let profesores_fp = asignaturas_fp.map(asignatura => asignatura.profesor);
    profesores_fp = profesores_fp.filter((profesor, index, self) => 
        index === self.findIndex(t => (
            t._id === profesor._id
        ))
    )

    res.json(profesores_fp);
}

const findAlumnos2ºFP = async (req, res ) => {

   ///const fps = etapa.find ({$or: [{ nombre: 'GRADO_MEDIO'}, {nombre: 'GRADO_SUPERIOR'}]});

    let findAlumnos2ºFP = await Alumno.aggregate([
        {
            $match: {
                $or: [
                    { tipoDisciplina: 'FP' },
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
    renderModifyFCT,
    updateFCT,
    deleteFCT,
    
}
