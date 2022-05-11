const Province = require('../models/Provinces');
const City = require('../models/cities');
const festivos = require('../models/festivos');

    
const renderCreateFestivo =  async (req, res) => {
    const festivo = await festivos.find().lean();
    res.render('registrar_festivo' , {festivo} );
}

//CREACION DE EMPRESAS

const crearFestivo = async (req, res) => {
    const {    } = req.body;

    const festivos = await festivos.findOne({ nombre });
    console.log(festivos)

    if(festivos) {
        req.flash('error', 'La Festividad ya fue registrada');
        return res.redirect('registrar_festivo');
    }

    const newFestivo = FCT ({

        
    });
}

module.exports = {
    
    crearFestivo,
    renderCreateFestivo,    
}

