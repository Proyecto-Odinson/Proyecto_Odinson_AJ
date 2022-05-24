
const festivos = require('../models/festivos');

// RENDER CREAR Y MODIFICAR FESTIVO

const renderCreateFestivo =  async (req, res) => {
   res.render('registrar_festivo');
}

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
        return res.redirect('registrar_festivo', { nombre });
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
    const updatedFestivo = await festivo.updateOne({ _id: FestivoId}, req.body);

    console.log( updatedFestivo);
    res.redirect('/festivos')
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
    const festivoProvince = await festivos.find({province: ProvinceID}).lean();

    res.json(festivoProvince);
}

// VER FESTIVOS POR LOCALIDAD

const findFestivobyProvince_Localidad = async (req, res) => {

    const localidad = req.params.localidad;
    const provincia = req.params.provincia;

    const festivoLocalidad = await festivos.find({ localidad, provincia }).lean();

    res.json(festivoLocalidad);
}

// VER FIESTAS NACIONALES

const findFestivoNacional = async (req, res ) => {

    const findFestivoNacional = await festivos.find({nacional: 'true'}).lean();

    res.json(findFestivoNacional);
}

// FESTIVOS JAEN

const festivosJaen = async (req , res) => {

    const jaenID = req.params.id;
    const findFestivosJaen = await festivos.findById(jaenID).lean()

    res.json(findFestivoNacional)

}

module.exports = {
    
    crearFestivo,
    renderCreateFestivo, 
    findFestivos,  
    findFestivobyProvince,
    findFestivobyProvince_Localidad,
    findFestivoNacional,
    festivosJaen,
    renderModificarFestivo,
    updatedFestivo,
    deletedFestivo,
     
}

