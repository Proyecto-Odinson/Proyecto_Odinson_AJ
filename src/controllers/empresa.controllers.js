
const Empresa = require("../models/empresa");

   
const renderCreateEmpresa = (req, res) => {
    res.render('registrar_empresa');
}

//CREACION DE EMPRESAS

const crearEmpresa = async (req, res) => {
    const {province, city, name, familia_profesional, phone , phone2 , email, NIF, fax , actividad, representante_certificado_digital, calle, via, tipo_via, n_via, portal, puerta, escalera, bloque, codigo_postal} = req.body;

    const empresa = await Empresa.findOne({ name });
    console.log(empresa)

    if(empresa) {
        req.flash('error', 'La empresa ya fue registrada');
        return res.redirect('registrar_empresa', { name  });
    }

    const newEmpresa = Empresa ({

        province, 
        city, 
        name,
        familia_profesional, 
        phone ,
        phone2 , 
        email, 
        NIF,
        fax ,
        actividad, 
        representante_certificado_digital, 
        calle,
        via,
        tipo_via, 
        n_via, 
        portal,
        puerta,
        escalera, 
        bloque,
        codigo_postal
    });

    try {
        await newEmpresa.save();
        req.flash('success', 'Se ha guardado la empresa correctamente.');
        console.log(newEmpresa)
        return res.redirect('/empresas');
        
    } catch (error) {
        req.flash('error', 'No se ha podido guardar la empresa');
        console.log(error)
        return res.redirect('/registrar_empresa');
    }


}


// FUNCIONES

const findEmpresas = async (req, res) => {

    const empresas = await Empresa.find().lean();

    res.render('empresas', { empresas });
}


module.exports = {
    
    findEmpresas,
    crearEmpresa,
    renderCreateEmpresa,
    
}
