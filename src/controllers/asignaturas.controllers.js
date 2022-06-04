
const Asignaturas = require("../models/asignaturas");
const { Alumno } = require('../models/users');
const FCT = require('../models/FCT');

// VER ASIGNATURAS FP RENDER

const ShowAsignaturasForFP = async (req, res) => {

const idFP = req.params.id;

const ShowAsignaturasForFP = await Asignaturas.find({ fp: idFP}).lean()

res.render('ShowAsignaturasForFP', {ShowAsignaturasForFP})

}

// RENDER MODIFICAR ASIGNATURA FP

const renderModificarAsignatura= async (req, res) => {

    const AsignaturaID = req.params.id;

    const asignatura = await Asignaturas.findById(AsignaturaID).lean();

    res.render('mod_asig_fp', { asignatura });
}

// MODIFICAR ASIGNATURA FP

const ModifyAsignaturaFP = async (req, res) => {

    const idFP = req.params.id;
    const CurrentAsignaturasFP = await Asignaturas.find({_id: idFP});

    const AsignaturaId = req.params.id;
    const updatedAsignatura = await Asignaturas.updateOne({ _id: AsignaturaId}, req.body);

    console.log( updatedAsignatura);

    res.redirect('/ShowEtapasFP');

}

// FUNCIONES

const findAsignaturas = async (req, res) => {
    const AllAsignaturas = await Asignaturas.find();
    res.json(AllAsignaturas);
}


const findAsignaturaforFP = async (req,res) => {

    const idFP = req.params.id;
    const curso = req.params.curso;

    const findAsignaturaforFP = await Asignaturas.find({ fp: idFP, curso })

    console.log(findAsignaturaforFP);

    res.json(findAsignaturaforFP);
}


const getAlumnosFromModuleOfProfesor = async (req, res) => {
    const profesor = req.user;

    if(!profesor.tutor || profesor.tutor.curso !== 2) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/');

    res.json(FCTs);
}

module.exports = {
    
    findAsignaturaforFP,
    findAsignaturas,
    ShowAsignaturasForFP,
    renderModificarAsignatura,
    ModifyAsignaturaFP,
    getAlumnosFromModuleOfProfesor
}
