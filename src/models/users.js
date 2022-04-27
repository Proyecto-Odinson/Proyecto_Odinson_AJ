//Creamos un las variables Schema y model que usaran Mongoose
const { Schema, model } = require('mongoose');

//Importaremos bycrypt el cual usaremos para almacenar la contraseña cifrada 
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fistname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    email2: { type: String , required: false},
    phone: { type: Number, required: true },
    phone2: { type: Number, required: false},
    calle: { type: String , required: true },
    tipo_via: { type: String , required: true },
    nombre_via: { type: String , required: true },
    n_via: { type: String , required: true },
    portal: { type: String , required: true },
    puerta: { type: String ,  required: true },
    escalera: { type: String , required: true },
    bloque: { type: String , required: true },
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    etapa: { type: String, required: true },
    curso: { type: String, required: true },
    year: { type: String, required: true },
    nombre_curso: { type: String }
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
    jefe_departamento: { type:Boolean, default: false },
    codigo: {type: String , required: true},
    tutor: { type: Boolean , default:false},
    
});

const AlumnoSchema = new Schema({
    n_expediente: { type: Number, required: true, unique: true },
    DNI: { type: String, required: true },
    autorizacion_datos: { type: Boolean, default: false },
    fecha_nac: { type: Date , required: true },
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