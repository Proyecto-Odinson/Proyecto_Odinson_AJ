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

module.exports = {
    createPDF_autorizaciones
}