const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
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
    jefe_departamento: { type: Schema.Types.ObjectId, ref: 'Profesor' },
    street: { type: String, required: true },
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    city: { type: Schema.Types.ObjectId, ref: 'City' }
});

const AlumnoSchema = new Schema({
    n_expediente: { type: Number, required: true, unique: true },
    fecha_nac: { type: Date, required: true },
    street: { type: String, required: true },
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    city: { type: Schema.Types.ObjectId, ref: 'City' } 
})

const AdminSchema = new Schema()

 
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