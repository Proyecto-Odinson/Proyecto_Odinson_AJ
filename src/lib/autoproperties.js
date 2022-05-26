/**
 * 
 * @param {*} model Modelo de la base de datos
 * @param {*} newData Datos desde formulario
 * @returns Nuevo modelo con los datos actualizados
 */

const autoProperties = (model, newData) => {
    const properties = Object.keys(newData);

    for (let property of properties) { 

        let value = newData[property];
        if(value) {
            model[property] = value;
        }
    }

    return model;
}

module.exports = autoProperties;