const { Alumno } = require('../models/users');
const Asignaturas = require ('../models/asignaturas')

// RENDER DOCUMENTOS PROFESORADO

const renderDocumentosProfesarado = async (req, res) => {

    res.render('documentosProfesorado');
}

const AlumnosAutorizaciones = async (req, res) => {

    const profesor = req.user

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 
    if(!profesor.tutor.clase) return res.redirect('/')

    const fp = profesor.tutor.clase
    const curso = profesor.tutor.curso

    const asignaturasCurso = await Asignaturas.find({fp: fp , curso: curso});

    const asignaturaArray = asignaturasCurso.map( elemento => { return elemento._id})

    const idAsignaturas = await Asignaturas.find({_id: asignaturaArray});

    const AlumnosAsignaturas = await Alumno.find({asignatura: idAsignaturas}).populate('disciplina')

    const AlumnosAutorizaciones = await AlumnosAsignaturas.map ( element => { return element.autorizacion_datos})
 
    const AlumnosAsignaturasJSON  =  JSON.parse(JSON.stringify(AlumnosAsignaturas)); 

    res.render('AlumnosAutorizaciones' , { alumnos: AlumnosAsignaturasJSON  })   
}


module.exports = {
    renderDocumentosProfesarado,
    AlumnosAutorizaciones,
}
