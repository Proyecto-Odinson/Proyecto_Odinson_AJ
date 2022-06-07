const FCT = require("../models/FCT");
const { Profesor, Alumno } = require('../models/users');
const Empresa = require ('../models/empresa');
const Asignatura = require('../models/asignaturas');
const etapa = require('../models/etapa');
const { formatDate } = require('../lib/date');
const fp = require("../models/fp");
const empresa = require("../models/empresa");


// RENDER PARA CREAR FCT

const RenderCreateFCT = async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor || profesor.tutor.curso !== 2) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 

    const empresas = await Empresa.find();

    const alumnosFP = await Alumno.find({disciplina: profesor.tutor.clase});

    const asignaturasFP = await Asignatura.find({fp: profesor.tutor.clase , curso: profesor.tutor.curso});

    const ProfesAsignaturaArray = asignaturasFP.map( elemento => {
        return elemento.profesor;
    })

    const ProfesAsignatura = await Profesor.find( {_id: ProfesAsignaturaArray} );


    const FPAsignaturaArray = asignaturasFP.map( elemento => {
        return elemento.fp;
    })

    const idFP = await fp.find( {_id: FPAsignaturaArray} );

    const empresasJson = JSON.parse(JSON.stringify(empresas));
    const alumnosFPJson = JSON.parse(JSON.stringify(alumnosFP));
    const profesoresFPJson = JSON.parse(JSON.stringify(ProfesAsignatura));
    const fpJson =  JSON.parse(JSON.stringify(idFP));

    res.render('registrar_FCT', {fp: fpJson, alumnos: alumnosFPJson , empresas: empresasJson , profesores: profesoresFPJson})
}

// RENDER PARA MODIFICAR FCT

const renderModifyFCT =  async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor || profesor.tutor.curso !== 2) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 

    const fctID = req.params.id;

    const FCT = await fct.findById(fctID).lean();

    const empresas = await empresa.find().lean();
    const alumnosFP = await Alumno.find({disciplina: profesor.tutor.clase});
    const asignaturasFP = await Asignatura.find({fp: profesor.tutor.clase , curso: profesor.tutor.curso});

    const ProfesAsignaturaArray = asignaturasFP.map( elemento => {return elemento.profesor;})
    const ProfesAsignatura = await Profesor.find( {_id: ProfesAsignaturaArray} );
    
    const FPAsignaturaArray = asignaturasFP.map( elemento => { return elemento.fp;})
    const idFP = await fp.find({_id: FPAsignaturaArray} );

    const empresasJson = JSON.parse(JSON.stringify(empresas));
    const alumnosFPJson = JSON.parse(JSON.stringify(alumnosFP));
    const profesoresFPJson = JSON.parse(JSON.stringify(ProfesAsignatura));
    const fpJson =  JSON.parse(JSON.stringify(idFP));

    const fecha_inico = formatDate(new Date(fct.fecha_inicio));
    const fecha_final = formatDate(new Date(fct.fecha_final));
 
    res.render('mod_FCT' , {FCT, empresas , fecha_inico , fecha_final , fp: fpJson , alumnos: alumnosFPJson , empresas: empresasJson , profesores: profesoresFPJson } )
}

//CREACION DE FCT

const crearFCT = async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor || profesor.tutor.curso !== 2) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 

    const { alumno, fp, empresa , tutor, tutor_laboral ,trimestre, horas, fecha_inicio, fecha_final} = req.body;

    console.log(req.body)

    const fct = await FCT.findOne({ alumno });
    console.log(fct)

    if(fct) {
        req.flash('error', 'La FCT ya fue registrada con dicho alumno');
        return res.redirect('registrar_FCT');
    }

    const newFCT = FCT ({
        alumno,
        fp,
        empresa,
        tutor,
        tutor_laboral,
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

// UPDATE FCT

const updateFCT = async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor || profesor.tutor.curso !== 2) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/');

    const fctId = req.params.id;

    const updatedFCT = await fct.updateOne({ _id: fctId}, req.body);

    console.log( updatedFCT);
    res.redirect('/alumnos_FCT')
}
 
// BORRAR FCT

const deleteFCT = async ( req, res ) => {

    const profesor = req.user;

    if(!profesor.tutor || profesor.tutor.curso !== 2) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/');

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

    const profesor = req.user;

    if(!profesor.tutor || profesor.tutor.curso !== 2) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/');

    const findFP_FCT = await FCT.find({fp: profesor.tutor.clase}).populate('alumno').populate('empresa').populate('tutor').populate('fp');

    console.log(findFP_FCT);
        
    const alumnosFCT_JSON = JSON.parse(JSON.stringify(findFP_FCT));

    res.render('alumnos_FCT', { alumnosFCT: alumnosFCT_JSON});
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
    findProfesFP,
    findAlumnos2ºFP,
    renderModifyFCT,
    updateFCT,
    deleteFCT,
    RenderCreateFCT,
}
