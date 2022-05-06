//Creamos un las variables Schema y model que usaran Mongoose
const { Schema, model } = require('mongoose');

//Importaremos bycrypt el cual usaremos para almacenar la contraseña cifrada 
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    email2: { type: String , required: false},
    phone: { type: Number, required: true },
    phone2: { type: Number, required: false},
    calle: { type: String , required: true },
    tipo_via: { type: String , required: true },
    n_via: { type: Number , required: true },
    portal: { type: Number , required: false },
    puerta: { type: String ,  required: false },
    escalera: { type: String , required: false },
    bloque: { type: Number , required: false },
    province: { type: Schema.Types.ObjectId, ref: 'Province', required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
})

UserSchema.pre('save', async function(next) {
    const user = this;

    if(!user.isModified('password')) next();

    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
})

UserSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}


const ProfeSorSchema = new Schema({
    jefe_departamento: { type:Boolean, default: false, unique: true},
    codigo: {type: String , required: true, unique: true},
    tutor: { type: Boolean , default: false},
    asignaturas: [{ type: Schema.Types.ObjectId, ref: 'Asignatura' }],
    
    
});

const AlumnoSchema = new Schema({
    n_expediente: { type: Number, required: true, unique: true },
    DNI: { type: String, required: true , unique: true},
    autorizacion_datos: { type: Boolean, default: false },
    fecha_nac: { type: Date , required: true },
    notas: [
        {
            asignatura: { type: Schema.Types.ObjectId, ref: 'Asignatura', required: true },
            trimestre:{ type: Number},
            a_escolar: { type: String},
            nota: {type: Number},
        }
    ],
    asignaturas: [{ type: Schema.Types.ObjectId, ref: 'Asignatura', required: false }],
    etapa: { type: Schema.Types.ObjectId, ref: 'Etapa', required: false },
    fp: { type: Schema.Types.ObjectId, ref: 'FP', required: false },

})

const AdminSchema = new Schema( { } )

 
const User = model('User', UserSchema);
const Profesor = User.discriminator('Profesor', ProfeSorSchema);
const Alumno = User.discriminator('Alumno', AlumnoSchema);
const Admin = User.discriminator('Administrador', AdminSchema);

module.exports = {
    User,
    Profesor,
    Alumno,
    Admin
}