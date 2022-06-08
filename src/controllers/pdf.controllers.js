const Asignaturas = require('../models/asignaturas');
const {Alumno} = require('../models/users');

var pdf = require("pdf-creator-node");
var fs = require("fs"); 
var path = require("path");

const templatesDir = path.join(__dirname, "..","templates")
console.log(path.join(__dirname, "..","templates"))

const createPDF_autorizaciones = async (req, res) => {

    const profesor = req.user

    var html = fs.readFileSync(path.join(templatesDir, "autorizaciones.html"), "utf8");

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 
    if(!profesor.tutor.clase) return res.redirect('/')

    const fp = profesor.tutor.clase
    const curso = profesor.tutor.curso

    const asignaturasCurso = await Asignaturas.find({fp: fp , curso: curso});

    const asignaturaArray = asignaturasCurso.map( elemento => { return elemento._id})

    const idAsignaturas = await Asignaturas.find({_id: asignaturaArray});

    const AlumnosAsignaturas = await Alumno.find({asignatura: idAsignaturas}).populate('disciplina').lean();

    var document = {
        html: html,
        data: {
          alumnos: AlumnosAsignaturas,
        },
        type: "buffer",
      };

    const buffer = await pdf.create(document);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', "attachment; filename=autorization.pdf");
    res.setHeader('Content-Length', buffer.length);

    res.send(buffer);
}


const createPDF_notas_finales = async (req, res) => {

  const profesor = req.user

  var html = fs.readFileSync(path.join(templatesDir, "notas_finales.html"), "utf8");

  if(profesor.tipoDisciplina !== 'FP') return res.redirect('/')

  const asignatura = req.params.id

  const findAllNotas = await notas.find({asignatura: asignatura}).populate('asignatura').populate('alumno').populate('profesor');

  const notasJSON  =  JSON.parse(JSON.stringify(findAllNotas));

  var document = {
      html: html,
      data: {
        notas: notasJSON,
      },
      type: "buffer",
    };

  const buffer = await pdf.create(document);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', "attachment; filename=autorization.pdf");
  res.setHeader('Content-Length', buffer.length);

  res.send(buffer);
}

const createPDF_etiquetas_mesas = async (req, res ) => {

  const profesor = req.user

  var html = fs.readFileSync(path.join(templatesDir, "notas_finales.html"), "utf8");

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 
    if(!profesor.tutor.clase) return res.redirect('/')

    const fp = profesor.tutor.clase
    const curso = profesor.tutor.curso

    const asignatura = await Asignaturas.find({fp: fp , curso: curso})

    const asignaturaID = asignatura.map( elemento => { return elemento._id})

    const alumnos = await Alumno.find({asignaturas: {$in: asignaturaID }})

    const alumnosJSON  =  JSON.parse(JSON.stringify(alumnos));

    var document = {
      html: html,
      data: {
        alumnos: alumnosJSON,
      },
      type: "buffer",
    };

  const buffer = await pdf.create(document);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', "attachment; filename=etiquetas.pdf");
  res.setHeader('Content-Length', buffer.length);

  res.send(buffer);
}


module.exports = {
    createPDF_autorizaciones,
    createPDF_notas_finales,
    createPDF_etiquetas_mesas,
}