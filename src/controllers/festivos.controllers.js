
const festivos = require('../models/festivos');
const autoProperties = require('../lib/autoproperties');

// RENDER PARA CREAR FESTIVO

const renderCreateFestivo =  async (req, res) => {
   res.render('registrar_festivo');
}

// RENDER PARA MOD FESTIVO

const renderModificarFestivo = async (req, res) => {

    const festivoId = req.params.id;

    const festivo = await festivos.findById(festivoId).lean();

    res.render('mod_festivo', { festivo });
}

//CREACION DE FESTIVOS

const crearFestivo = async (req, res) => {
    const { nombre, dia, mes, nacional, province, city } = req.body;

    const festivo = await festivos.findOne({ nombre });
    console.log(festivo)

    if(festivo) {
        req.flash('error', 'La Festividad ya fue registrada');
        return res.redirect('/registrar_festivo', { nombre });
    }

    const newFestivo = festivos ({

        nombre, dia, mes, nacional, province, city
        
    });

    try {
        await newFestivo.save();
        req.flash('success', 'Se ha guardado el festivo correctamente.');
        console.log(newFestivo)
        return res.redirect('/festivos');
        
    } catch (error) {
        req.flash('error', 'No se ha podido guardar el festivo');
        console.log(error)
        return res.redirect('/registrar_festivo');
    }

}

//MODIFICAR FESTIVO EXISTENTE

const updatedFestivo = async (req, res) => {

    const FestivoId = req.params.id;
    const newData = req.body;

    const festivoToUpdate = await festivos.findById(FestivoId);

    if(newData.nacional) {
        delete festivoToUpdate.province
        delete festivoToUpdate.city
    }

    const festivoUpdated = autoProperties(festivoToUpdate, newData);

    await festivoUpdated.save();

    res.redirect('/festivos');
    
}


//BORRAR FESTIVO

const deletedFestivo = async ( req, res ) => {

    try {
        const deleteFestivo = await festivos.deleteOne ({ _id: req.body.festivo })
        req.flash('success', 'Se ha borrado el festivo.');
        console.log(deleteFestivo)
        return res.redirect('/festivos');
    } catch (error) {
        req.flash('error', 'No se ha podido borrar el festivo');
        console.log(error)
        return res.redirect('/festivos');
    }
}


// FUNCIONES: VER TODOS LOS FESTIVOS

const findFestivos = async (req, res) => {

    const festivo = await festivos.find().lean();

    res.render('festivos', { festivo });
}

// VER FESTIVOS POR PROVINCIA

const findFestivobyProvince = async (req, res ) => {

    const ProvinceID = req.params.id;
    const festivoProvince = await festivos.find({province: ProvinceID, city: { $exists : false }}).lean();

    res.json(festivoProvince);
}

// VER FESTIVOS POR LOCALIDAD

const findFestivobyProvince_Localidad = async (req, res) => {

    const localidad = req.params.localidad;
    const provincia = req.params.provincia;

    const festivoLocalidad = await festivos.find({ province: provincia, city: localidad }).lean();

    res.json(festivoLocalidad);
}

// VER FIESTAS NACIONALES

const findFestivoNacional = async (req, res ) => {

    const findFestivoNacional = await festivos.find({nacional: 'true'}).lean();

    res.json(findFestivoNacional);
}


module.exports = {
    
    crearFestivo,
    renderCreateFestivo, 
    findFestivos,  
    findFestivobyProvince,
    findFestivobyProvince_Localidad,
    findFestivoNacional,
    renderModificarFestivo,
    updatedFestivo,
    deletedFestivo,
     
}

