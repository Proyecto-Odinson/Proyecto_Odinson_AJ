const Asignaturas = require("../models/asignaturas");
const { Alumno , Profesor, User} = require('../models/users');
const etapa = require('../models/etapa');
const fp = require('../models/fp');
const notas = require("../models/notas");

const autoProperties = require ('../lib/autoproperties')


// RENDER PARA VER NOTAS DE CLASE [PARA TUTOR]  

const renderShowClase = async (req,res) => {

    const profesor = req.user

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 
    if(!profesor.tutor.clase) return res.redirect('/')

    const fp = profesor.tutor.clase
    const curso = profesor.tutor.curso
     
    const asignaturasCurso = await Asignaturas.find({fp: fp , curso: curso});

    const asignaturaArray = asignaturasCurso.map( elemento => { return elemento._id})

    const idAsignaturas = await Asignaturas.find({_id: asignaturaArray});

    const notasTutor = await notas.find({asignatura: idAsignaturas}).populate('alumno').populate('asignatura').populate('profesor').populate('fp')

    const notastutorJSON  =  JSON.parse(JSON.stringify(notasTutor));

    res.render('ShowClaseFP', { notasTutor: notastutorJSON}); 
}

 
// RENDER SHOW ASIGNATURAS DE UN PROFESOR FP

const renderShowAsignaturaForProfesor = async (req, res) => {

    const Profesor = req.user

    if(Profesor.tipoDisciplina !== 'FP') return res.redirect('/');  

    const IDProfesor = Profesor._id
     
    const asignaturas_Profesor = await Asignaturas.find({profesor: IDProfesor});

    const asignaturaArray = asignaturas_Profesor.map( elemento => { return elemento._id})

    const idAsignaturas = await Asignaturas.find({_id: asignaturaArray}).populate('fp');

    const AsignaturasJSON  =  JSON.parse(JSON.stringify(idAsignaturas));

    res.render('ShowAsignaturasForProfesor', {asignaturas: AsignaturasJSON  }) ;
}

// RENDER CREAR NOTA 

const renderCreateNote = async (req, res) => {

    const Profesor = req.user
    const IDProfesor = Profesor._id

    if(Profesor.tipoDisciplina !== 'FP') return res.redirect('/');  

    const asignaturaID = req.params.id;

    const asignatura = await Asignaturas.findById(asignaturaID).lean().populate('fp');

    const alumnos = await Alumno.find({asignaturas: {$in: asignaturaID }})

    const alumnosJSON  =  JSON.parse(JSON.stringify(alumnos));

    res.render('CrearNota', { asignatura , alumnos: alumnosJSON , profesor: IDProfesor}) ;
}

// CREAR NOTA 

const createNota = async (req, res) => {

 const {asignatura, alumno, fp ,  profesor ,trimestre, a_escolar, nota, comentario} = req.body;

 const newNota = notas ({

    asignatura, 
    alumno,
    fp,
    profesor,
    trimestre, 
    a_escolar, 
    nota, 
    comentario       
});
    
try {
    await newNota.save();
    req.flash('success', 'Se ha guardado la nota correctamente.');
    console.log(newNota)
     return res.redirect('/ShowAsignaturasForProfesor');
            
 } catch (error) {
    req.flash('error', 'No se ha podido guardar la nota');
    console.log(error)
     return res.redirect('/ShowAsignaturasForProfesor');
 }
      
}

// RENDER MODIFICAR NOTA

const renderModificarNota = async (req, res) => {
   
    const profesor = req.user;

    const IDProfesor = profesor._id

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/')

    const notaId = req.params.id;

    const nota = await notas.findById(notaId).lean().populate('asignatura').populate('alumno');

    res.render('mod_nota', { nota , profesor: IDProfesor });
}

// MODIFICAR NOTA 

const modifyNota = async (req, res) => {

    const profesor = req.user;

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/')

    const notaId = req.params.id;
    const notaToUpdate = await notas.findById(notaId);

    const notaUpdated = autoProperties(notaToUpdate, req.body);

    await notaUpdated.save();
    
    res.redirect('/ShowAsignaturasForProfesor') 

} 

// ELIMINAR NOTA 

const deleteNota = async ( req, res ) => {

    const profesor = req.user

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 

    try {
        const deleteNota = await notas.deleteOne ({ _id: req.body.nota} )
        req.flash('success', 'Se ha borrado la nota.');
        console.log(deleteNota)
        return res.redirect('/ShowAsignaturasForProfesor');

    } catch (error) {
        req.flash('error', 'No se ha podido borrar la nota');
        console.log(error)
        return res.redirect('/ShowAsignaturasForProfesor');
    }
}

// LISTAR TODAS LAS NOTAS DE UNA ASIGNATURA DE UN PROFESOR

const findAllNotas = async (req, res ) => {

    const profesor = req.user;

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/')

    const asignatura = req.params.id

    const findAllNotas = await notas.find({asignatura: asignatura}).populate('asignatura').populate('alumno').populate('profesor');

    const notasJSON  =  JSON.parse(JSON.stringify(findAllNotas));

    console.log(findAllNotas);

    res.render('AllNotasforProfesor' , {notas: notasJSON}) 
}

/*---------------------------------------------------------------------*/


// RENDER PARA VER NOTAS DE CLASE [PARA TUTOR]  

const renderShowClaseETAPA = async (req,res) => {

    const profesor = req.user

    if(profesor.tipoDisciplina !== 'Etapa') return res.redirect('/'); 
    if(!profesor.tutor.clase) return res.redirect('/')

    const etapa = profesor.tutor.clase
    const curso = profesor.tutor.curso
     
    const asignaturasCurso = await Asignaturas.find({etapa: etapa , curso: curso});

    const asignaturaArray = asignaturasCurso.map( elemento => { return elemento._id})

    const idAsignaturas = await Asignaturas.find({_id: asignaturaArray});

    const notasTutor = await notas.find({asignatura: idAsignaturas}).populate('alumno').populate('asignatura').populate('profesor').populate('fp')

    const notastutorJSON  =  JSON.parse(JSON.stringify(notasTutor));

    res.render('ShowClase_ETAPA', { notasTutor: notastutorJSON}); 
}

 
// RENDER SHOW ASIGNATURAS DE UN PROFESOR ETAPA

const renderShowAsignaturaForProfesor_ETAPA = async (req, res) => {

    const Profesor = req.user

    if(Profesor.tipoDisciplina !== 'Etapa') return res.redirect('/');  

    const IDProfesor = Profesor._id
     
    const asignaturas_Profesor = await Asignaturas.find({profesor: IDProfesor});

    const asignaturaArray = asignaturas_Profesor.map( elemento => { return elemento._id})

    const idAsignaturas = await Asignaturas.find({_id: asignaturaArray}).populate('etapa');

    const AsignaturasJSON  =  JSON.parse(JSON.stringify(idAsignaturas));

    res.render('ShowAsignaturasForProfesor_ETAPA', {asignaturas: AsignaturasJSON  }) ;
}

// RENDER CREAR NOTA 

const renderCreateNoteETAPA = async (req, res) => {

    const Profesor = req.user
    const IDProfesor = Profesor._id

     if(Profesor.tipoDisciplina !== 'Etapa') return res.redirect('/');  

    const asignaturaID = req.params.id;

    const asignatura = await Asignaturas.findById(asignaturaID).lean().populate('etapa');

    const alumnos = await Alumno.find({asignaturas: {$in: asignaturaID }})

    const alumnosJSON  =  JSON.parse(JSON.stringify(alumnos));

    res.render('crearNota_ETAPA', { asignatura , alumnos: alumnosJSON , profesor: IDProfesor}) ;
}

// CREAR NOTA 

const createNotaETAPA = async (req, res) => {

 const {asignatura, alumno, etapa,  profesor ,trimestre, a_escolar, nota, comentario} = req.body;

 const newNota = notas ({

    asignatura, 
    alumno,
    etapa, 
    profesor,
    trimestre, 
    a_escolar, 
    nota, 
    comentario       
});
    
try {
    await newNota.save();
    req.flash('success', 'Se ha guardado la nota correctamente.');
    console.log(newNota)
     return res.redirect('/ShowAsignaturasForProfesor_ETAPA');
            
 } catch (error) {
    req.flash('error', 'No se ha podido guardar la nota');
    console.log(error)
     return res.redirect('/ShowAsignaturasForProfesor_ETAPA');
 }
      
}

// RENDER MODIFICAR NOTA

const renderModificarNotaETAPA = async (req, res) => {
   
    const profesor = req.user;

    const IDProfesor = profesor._id

    if(profesor.tipoDisciplina !== 'Etapa') return res.redirect('/')

    const notaId = req.params.id;

    const nota = await notas.findById(notaId).lean().populate('asignatura').populate('alumno').populate('etapa').populate('profesor');

    res.render('mod_nota_ETAPA', { nota , profesor: IDProfesor });
}

// MODIFICAR NOTA 

const modifyNotaETAPA = async (req, res) => {

    const profesor = req.user;

    if(profesor.tipoDisciplina !== 'Etapa') return res.redirect('/')

    const notaId = req.params.id;
    const notaToUpdate = await notas.findById(notaId);

    const notaUpdated = autoProperties(notaToUpdate, req.body);

    await notaUpdated.save();
    
    res.redirect('/ShowAsignaturasForProfesor_ETAPA') 

} 

// ELIMINAR NOTA 

const deleteNotaETAPA = async ( req, res ) => {

    const profesor = req.user

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 

    try {
        const deleteNota = await notas.deleteOne ({ _id: req.body.nota} )
        req.flash('success', 'Se ha borrado la nota.');
        console.log(deleteNota)
        return res.redirect('/ShowAsignaturasForProfesor_ETAPA');

    } catch (error) {
        req.flash('error', 'No se ha podido borrar la nota');
        console.log(error)
        return res.redirect('/ShowAsignaturasForProfesor_ETAPA');
    }
}

// LISTAR TODAS LAS NOTAS DE UNA ASIGNATURA DE UN PROFESOR

const findAllNotasETAPA = async (req, res ) => {

    const profesor = req.user;

    if(profesor.tipoDisciplina !== 'Etapa') return res.redirect('/')

    const asignatura = req.params.id

    const findAllNotas = await notas.find({asignatura: asignatura}).populate('asignatura').populate('alumno').populate('profesor');

    const notasJSON  =  JSON.parse(JSON.stringify(findAllNotas));

    console.log(findAllNotas);

    res.render('AllNotasforProfesor_ETAPA' , {notas: notasJSON}) 
}

module.exports = {

    renderShowClase,
    renderShowAsignaturaForProfesor,
    renderCreateNote,
    createNota,
    renderModificarNota,
    modifyNota,
    deleteNota,
    findAllNotas,
    renderShowClaseETAPA,
    renderShowAsignaturaForProfesor_ETAPA,
    renderCreateNoteETAPA,
    createNotaETAPA,
    renderModificarNotaETAPA,
    modifyNotaETAPA,
    deleteNotaETAPA,
    findAllNotasETAPA,
}

