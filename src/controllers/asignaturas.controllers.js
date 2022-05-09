
const asignaturas = require("../models/asignaturas");

const findAsignaturas = async (req, res) => {
    const AllAsignaturas = await asignaturas.find();
    res.json(AllAsignaturas);
}


const findAsignaturaforFP = async (req,res) => {

    const idFP = req.params.id;
    const curso = req.params.curso;

    const findAsignaturaforFP = await asignaturas.find({ fp: idFP, curso })

    console.log(findAsignaturaforFP);

    res.json(findAsignaturaforFP);
}

module.exports = {
    
    findAsignaturaforFP,
    findAsignaturas,
    
}
