const { Alumno, Profesor } = require('../models/users');
const { formatDate } = require('../lib/date')
const Asignaturas = require ('../models/asignaturas')
const notas = require ('../models/notas')
const FCT = require("../models/FCT");
const Empresa = require("../models/empresa");
const asignaturas = require('../models/asignaturas');

// RENDER DOCUMENTOS PROFESORADO

const renderDocumentosProfesarado = async (req, res) => {

    res.render('documentos_profesorado/documentosProfesorado');
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
 
    const AlumnosAsignaturasJSON  =  JSON.parse(JSON.stringify(AlumnosAsignaturas)); 

    res.render('documentos_profesorado/AlumnosAutorizaciones' , { alumnos: AlumnosAsignaturasJSON  })   
}


// LISTAR NOTA FINAL DE UNA ASIGNATURA

const Asignaturas_Profesor = async (req, res ) => {

    const Profesor = req.user

    if(Profesor.tipoDisciplina !== 'FP') return res.redirect('/');  

    const IDProfesor = Profesor._id
     
    const asignaturas_Profesor = await Asignaturas.find({profesor: IDProfesor});

    const asignaturaArray = asignaturas_Profesor.map( elemento => { return elemento._id})

    const idAsignaturas = await Asignaturas.find({_id: {$in: asignaturaArray }})

    const AsignaturasJSON = JSON.parse(JSON.stringify(idAsignaturas));

    const AlumnosAsignaturas = await Alumno.find({asignatura: idAsignaturas}).populate('disciplina')
 
    const AlumnosAsignaturasJSON  =  JSON.parse(JSON.stringify(AlumnosAsignaturas)); 

    res.render('documentos_profesorado/asignaturas_profesor' , {asignaturas: AsignaturasJSON , alumnos: AlumnosAsignaturasJSON }) 
}

const ListarNotasFinales = async (req, res ) => {

    const profesor = req.user;

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/')

    const asignatura = req.params.id

    const findAllNotas = await notas.find({asignatura: asignatura}).populate('asignatura').populate('alumno').populate('profesor');

    const notasJSON  =  JSON.parse(JSON.stringify(findAllNotas));

    res.render('documentos_profesorado/notas_finales' , { notas: notasJSON } ) 
}

const etiquetasMesas = async (req , res ) => {

    const profesor = req.user

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 
    if(!profesor.tutor.clase) return res.redirect('/')

    const fp = profesor.tutor.clase
    const curso = profesor.tutor.curso

    const asignatura = await Asignaturas.find({fp: fp , curso: curso})

    const asignaturaID = asignatura.map( elemento => { return elemento._id})

    const alumnos = await Alumno.find({asignaturas: {$in: asignaturaID }})

    const alumnosJSON  =  JSON.parse(JSON.stringify(alumnos));

    res.render('documentos_profesorado/etiquetas_mesas' , { alumnos: alumnosJSON } ) 
}

const fichaAlumnos = async (req , res ) => {

    const profesor = req.user

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 
    if(!profesor.tutor.clase) return res.redirect('/')

    const fp = profesor.tutor.clase
    const curso = profesor.tutor.curso

    const asignatura = await Asignaturas.find({fp: fp , curso: curso})

    const asignaturaID = asignatura.map( elemento => { return elemento._id})

    const alumnos = await Alumno.find({asignaturas: {$in: asignaturaID }}).populate('province').populate('city')

    const alumnosJSON  =  JSON.parse(JSON.stringify(alumnos));

    res.render('documentos_profesorado/ficha_alumnos' , { alumnos: alumnosJSON  } ) 
}


const firmaHuelga = async (req , res ) => {

    const profesor = req.user

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 
    if(!profesor.tutor.clase) return res.redirect('/')

    const fp = profesor.tutor.clase
    const curso = profesor.tutor.curso

    const asignatura = await Asignaturas.find({fp: fp , curso: curso})

    const asignaturaID = asignatura.map( elemento => { return elemento._id})

    const alumnos = await Alumno.find({asignaturas: {$in: asignaturaID }})

    const alumnosJSON  =  JSON.parse(JSON.stringify(alumnos));

    res.render('documentos_profesorado/firma_huelga' , { alumnos: alumnosJSON  } ) 
}

const InformeFCT = async (req , res ) => {

    const profesor = req.user;

    if(!profesor.tutor || profesor.tutor.curso !== 2) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/');

    const findFP_FCT = await FCT.find({fp: profesor.tutor.clase}).populate('alumno').populate('empresa').populate('tutor').populate('fp');

    const IDEmpresa = await findFP_FCT.map( elemento => { return elemento.empresa})

    const findEmpresa = await Empresa.find({_id: IDEmpresa }).populate('city').populate('province')

    const Empresa_JSON = JSON.parse(JSON.stringify(findEmpresa));
        
    const alumnosFCT_JSON = JSON.parse(JSON.stringify(findFP_FCT));

    res.render('documentos_profesorado/informe_FCT', {alumnos: alumnosFCT_JSON , empresa: Empresa_JSON} ) 
}


const ListadoForCurso = async (req , res ) => {

    const profesor = req.user;

    if(!profesor.tutor ) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/');

    const fp = profesor.tutor.clase
    const curso = profesor.tutor.curso

    const asignatura = await Asignaturas.find({fp: fp , curso: curso})

    const asignaturaID = asignatura.map( elemento => { return elemento._id})

    const alumnos = await Alumno.find({asignaturas: {$in: asignaturaID }}).populate('city').populate('province').populate('disciplina')

    const alumnosJSON  =  JSON.parse(JSON.stringify(alumnos));

    res.render('documentos_profesorado/ListadoAlumnosPorCurso', {alumnos: alumnosJSON } ) 
}


const ListadoForProfesor = async (req , res ) => {

    const profesor = req.user;

    if(!profesor.tutor ) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/');

    const profesor_id = profesor._id 

    const AsignaturasForProfesor = await asignaturas.find({profesor: {$in: profesor_id} })

    const idAsignaturas = AsignaturasForProfesor.map(element => { return element._id})

    const AlumnosForAsignatura = await Alumno.find({asignaturas: {$in: idAsignaturas} })

    const alumnosJSON  =  JSON.parse(JSON.stringify(AlumnosForAsignatura));

    const profesor_listado = await Profesor.find({_id: profesor_id})

    const profesorJSON  =  JSON.parse(JSON.stringify(profesor_listado));

    res.render('documentos_profesorado/ListadoAlumnosPorProfesor', { alumnos: alumnosJSON , profesor: profesorJSON } ) 
}

const listEmpresas = async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor ) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/');

    const empresas = await Empresa.find().lean().populate('city').populate('province');

    res.render('documentos_profesorado/ListadoEmpresas', { empresas } ) 
}

module.exports = {
    renderDocumentosProfesarado,
    AlumnosAutorizaciones,
    Asignaturas_Profesor,
    ListarNotasFinales,
    etiquetasMesas,
    fichaAlumnos,
    firmaHuelga,
    InformeFCT,
    ListadoForCurso,
    ListadoForProfesor,
    listEmpresas,
}
