
const festivos = require('../models/festivos');

    
const renderCreateFestivo =  async (req, res) => {
   res.render('registrar_festivo');
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


// FUNCIONES

// VER TODOS LOS FESTIVOS

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

const findFestivobyProvince_Localidad = async (req, res ) => {

    const ProvinceID = req.params.id;
    const LocalidadID = req.params.id;

    const festivoLocalidad = await festivos.find({province: ProvinceID, LocalidadID}).lean();

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
     
}

