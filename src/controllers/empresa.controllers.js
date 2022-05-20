
const Empresa = require("../models/empresa");

// RENDER CREAR EMPRESA

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

// MODIFICACION DE EMPRESAS RENDER

const renderModificarEmpresa = async (req, res) => {

    const EmpresaId = req.params.id;

    const empresa = await Empresa.findById(EmpresaId).lean();

    res.render('mod_empresa', { empresa });
}


//MODIFICAR EMPRESA EXISTENTE

const updateEmpresa = async (req, res) => {

    const EmpresaId = req.params.id;
    const updatedEmpresa = await Empresa.updateOne({ _id: EmpresaId}, req.body);

    res.redirect('empresas')
}


//BORRAR EMPRESA

const deleteEmpresa = async ( req, res ) => {

    try {
        const deleteEmpresa = await Empresa.deleteOne ( { _id: req.body.alumno } )
        req.flash('success', 'Se ha borrado la empresa.');
        console.log(deleteEmpresa)
        return res.redirect('/empresas');
    } catch (error) {
        req.flash('error', 'No se ha podido borrar la empresa');
        console.log(error)
        return res.redirect('/empresas');
    }
}

// FUNCIONES

const findEmpresas = async (req, res) => {

    const empresa = await Empresa.find().lean();

    res.render('empresas', { empresa });
}


module.exports = {
    
    findEmpresas,
    crearEmpresa,
    renderCreateEmpresa,
    renderModificarEmpresa,
    updateEmpresa, 
    deleteEmpresa,  
}
