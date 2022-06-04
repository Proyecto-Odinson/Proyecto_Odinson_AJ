//Creamos un las variables Schema y model que usaran Mongoose
const { Schema, model } = require('mongoose');

//Importaremos bycrypt el cual usaremos para almacenar la contraseña cifrada 
const bcrypt = require('bcrypt');

const UserSchema = new Schema({

    username: { type: String , required: false  },
    password: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    email2: { type: String , required: false},
    phone: { type: Number, required: true },
    phone2: { type: Number, required: false},
    active: {type: Boolean },

})

UserSchema.pre('save', async function (next) {

    const user = this;

    if(!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}


const ProfeSorSchema = new Schema({

    active: {type:Boolean, default: true},
    jefe_departamento: { type:Boolean, default: false},
    password: { type: String, required: true },
    codigo: {type: String , required: true, unique: true},
    calle: { type: String , required: true },
    tipo_via: { type: String , required: true },
    n_via: { type: Number , required: true },
    portal: { type: Number , required: false },
    puerta: { type: String ,  required: false },
    escalera: { type: String , required: false },
    bloque: { type: Number , required: false },
    province: { type: Schema.Types.ObjectId, ref: 'Province', required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    tutor: {
        clase: { type: Schema.Types.ObjectId , refPath:'tipoDisciplina'},
        curso: { type: Number }

    },
    tipoDisciplina: { type: String, enum: ['FP', 'Etapa'] , default: 'FP'},
    asignaturas: { type: Schema.Types.ObjectId, ref: 'Asignatura' },
});

const AlumnoSchema = new Schema({

    active: {type: Boolean, default: false},
    password: { type: String, required: false},
    n_expediente: { type: Number, required: true, unique: true },
    DNI: { type: String,  required: true , unique: true},
    calle: { type: String , required: true },
    tipo_via: { type: String , required: true },
    n_via: { type: Number , required: true },
    portal: { type: Number , required: false },
    puerta: { type: String ,  required: false },
    escalera: { type: String , required: false },
    bloque: { type: Number , required: false },
    province: { type: Schema.Types.ObjectId, ref: 'Province', required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    autorizacion_datos: { type: Boolean, default: false },
    fecha_nac: { type: Date , required: true },
    asignaturas: [{ type: Schema.Types.ObjectId, ref: 'Asignatura', required: false }],
    tipoDisciplina: { type: String, enum: ['FP', 'Etapa'] },
    disciplina: { type: Schema.Types.ObjectId , refPath:'tipoDisciplina' }
})

const AdminSchema = new Schema({})

 
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