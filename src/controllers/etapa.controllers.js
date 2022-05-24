const fp = require ('../models/fp');
const etapa = require('../models/etapa');

// VER TODAS LAS ETAPAS RENDER

const renderShowEtapas = async (req, res) => {

    const etapas = await etapa.find().lean();

    res.render('etapas', { etapas });
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
    renderShowEtapas,
    
}
