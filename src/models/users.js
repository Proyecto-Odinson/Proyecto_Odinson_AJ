const { Schema, model } = require('mongoose');

//userSchema = require ('.')

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    street: { type: String, required: true },
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    city: { type: Schema.Types.ObjectId, ref: 'City' }
})

const ProfeSorSchema = new Schema({
    jefe_departamento: { type: Schema.Types.ObjectId, ref: 'Profesor' }
});

const AlumnoSchema = new Schema({
    n_expediente: { type: Number, required: true, unique: true },
    fecha_nac: { type: Date, required: true }
})

 
const User = model('User', UserSchema);
const Profesor = User.discriminator('Profesor', ProfeSorSchema);
const Alumno = User.discriminator('Alumno', AlumnoSchema);

module.exports = {
    User,
    Profesor,
    Alumno
}