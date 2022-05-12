
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

const findFestivos = async (req, res) => {

    const festivo = await festivos.find().lean();

    res.render('festivos', { festivo });
}


module.exports = {
    
    crearFestivo,
    renderCreateFestivo, 
    findFestivos,  
     
}

