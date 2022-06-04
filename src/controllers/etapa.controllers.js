const fp = require ('../models/fp');
const etapa = require('../models/etapa');
const Asignaturas = require('../models/asignaturas');
const { Profesor } = require('../models/users')

// VER TODAS LAS ETAPAS FP RENDER

const renderShowEtapasFP = async (req, res) => {

    const etapas_fp = await etapa.find({ $or: [{ nombre: 'GRADO_MEDIO' }, { nombre: 'GRADO_SUPERIOR' }]}).lean();

    res.render('ShowEtapasFP', { etapas_fp });
}

const renderShowCiclosForFP = async (req, res) => {

    const etapaID = req.params.id;

    const ciclos_fp = await fp.find({etapa: etapaID }).lean();

    res.render('ShowCiclosforFP', { ciclos_fp });
}


// VER ETAPAS RENDER [ESO Y BACHILLER]

const renderShowEtapas = async (req, res) => {

    const etapas = await etapa.find({ $or: [{ nombre: 'BACHILLER' }, { nombre: 'ESO' }]}).lean();

    res.render('ShowEtapas', { etapas });
}


const renderShowAsignaturasForETAPA = async (req, res) => {

    const etapaID = req.params.id;

    const asignaturas = await Asignaturas.find({etapa: etapaID}).lean().populate('profesor');

    console.log(asignaturas)

    res.render('ShowCursos', { asignaturas });
}

// RENDER MODIFICAR ASIGNATURA ETAPA [ESO y BACHILLER]

const renderModifyAsignaturaETAPA = async (req, res) => {

    const AsignaturaID = req.params.id;

    const asignatura = await Asignaturas.findById(AsignaturaID).lean()

    const ProfesDisciplinaEtapa = await Profesor.find({tipoDisciplina: 'Etapa'})

    const ProfesDisciplinaEtapaJSON  = JSON.parse(JSON.stringify(ProfesDisciplinaEtapa));

    console.log(ProfesDisciplinaEtapaJSON)

    res.render('mod_asig_ETAPA', { asignatura , profesor: ProfesDisciplinaEtapaJSON });
}

// MODIFICAR ASIGNATURA ETAPA [ESO y BACHILLER]


const ModifyAsignaturaETAPA = async (req, res) => {

    const AsignaturaId = req.params.id;
    const updatedAsignatura = await Asignaturas.updateOne({ _id: AsignaturaId}, req.body);

    console.log( updatedAsignatura);

    res.redirect('/ShowEtapas');

}

// FUNCIONES

const findAllEtapas = async (req, res) => {
    const etapas = await etapa.find();
    res.json(etapas);
}


const findCicloForEtapa = async (req,res) => {
   
    const etapaID = req.params.id;

    const findCiclo = await fp.find({etapa: etapaID})

    res.json(findCiclo);
}

module.exports = {
    findAllEtapas,
    findCicloForEtapa,
    renderShowEtapasFP,
    renderShowCiclosForFP,
    renderShowEtapas,
    renderShowAsignaturasForETAPA,
    ModifyAsignaturaETAPA,
    renderModifyAsignaturaETAPA,

}
