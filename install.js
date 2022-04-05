require('dotenv').config()
require('./src/database')


const Province = require('./src/models/provinces')
const City = require('./src/models/cities')
const { Admin } = require('./src/models/users')

async function initData() {
    const jaen = new Province({
        name: 'jaen',
        showName: 'Jaén'
    })
    
    const cordoba = new Province({
        name: 'cordoba',
        showName: 'Córdoba'
    })
    
    const granada = new Province({
        name: 'granada',
        showName: 'Granada'
    })
    
    const jaenCities = ['Jaén', 'Úbeda', 'Martos', 'Alcaudete', 'Linares'];
    jaenCities.map(async c => {
        const newCity = new City({
            province: jaen._id,
            name: c
        })
    
        await newCity.save();
    })
    
    const cordobaCities = ['Córdoba', 'Belmez', 'Pozoblanco'];
    cordobaCities.map(async c => {
        const newCity = new City({
            province: cordoba._id,
            name: c
        })
    
        await newCity.save();
    })
    
    const granadaCities = ['Granada', 'Guadix', 'Armilla'];
    granadaCities.map(async c => {
        const newCity = new City({
            province: granada._id,
            name: c
        })
    
        await newCity.save();
    })
    
    const admin_user = {
        username: 'odinson', 
        password: 'admin',
        firstName: 'Proyect',
        lastName: 'Odinson',
        email: 'replaceme@me.com',
        phone: 999123987,
    }
    
    const new_admin = new Admin (admin_user)
    
    console.log(new_admin)
    
    
    Promise.all([
        jaen.save(),
        cordoba.save(),
        granada.save(),
        new_admin.save(),
    ])
    
}

initData()

setTimeout(() => {process.exit(0)},10000)