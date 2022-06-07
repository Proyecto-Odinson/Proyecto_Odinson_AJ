/**
 * 
 * @param {*} object Modelo de la base de datos
 * @param {*} updatedData Datos desde formulario
 * @returns Nuevo modelo con los datos actualizados
 */

const autoProperties = (object, updatedData) => {
    const properties = Object.keys(updatedData);

    for (let property of properties) { 
        let value = updatedData[property];

        if(value) {
            object[property] = value;
        }
    }
    return object;
}


module.exports = autoProperties;