
const asignaturas = require("../models/asignaturas");

const findAsignaturas = async (req, res) => {
    const AllAsignaturas = await asignaturas.find()
    res.json(AllAsignaturas);
}

const findAsignaturaETAPA = async (req,res) => {

    const idETAPA = req.params.id
    const curso = req.params.curso;

    const findAsignaturaforETAPA = await asignaturas.find({ etapa: idETAPA , curso})

    console.log(findAsignaturaforETAPA);

    res.json(findAsignaturaforETAPA);
}

module.exports = {
    
    findAsignaturaETAPA,
    findAsignaturas,
    
}

