
const asignaturas = require("../models/asignaturas");

const findAsignaturas = async (req, res) => {
    const AllAsignaturas = await asignaturas.find();
    res.json(AllAsignaturas);
}


const findAsignaturaforFP = async (req,res) => {

    const idFP = req.params.id;

    const findAsignaturaforFP = await asignaturas.find({fp: idFP})

    res.json(findAsignaturaforFP);
}

module.exports = {
    
    findAsignaturaforFP,
    findAsignaturas,
    
}
