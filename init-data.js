
require('dotenv').config()
require('./src/database')

const City = require('./src/models/cities');
const Province = require('./src/models/provinces');
const fp = require('./src/models/fp');
const etapa = require('./src/models/etapa');


// CREACION DE PROVINCIAS 

async function initData()  {

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

    await jaen.save();
    await cordoba.save();
    await granada.save();


// CREACION DE LOCALIDADES POR PROVINCIA

 const jaenCities = ['Jaén', 'Úbeda', 'Martos', 'Andújar', 'Alcaudete', 'Linares'];
 jaenCities.map(async c => {
     const newCity = new City({
         province: jaen,
         name: c
     })
     await newCity.save();

 })    

 const cordobaCities = ['Córdoba', 'Belmez', 'Pozoblanco'];
 cordobaCities.map(async c => {
     const newCity = new City({
         province: cordoba,
         name: c
     })
 
     await newCity.save();
 })
 
 const granadaCities = ['Granada', 'Guadix', 'Armilla'];
 granadaCities.map(async c => {
     const newCity = new City({
         province: granada,
         name: c
     })
 
     await newCity.save();
 })

 // CREACION DE ETAPAS

 const ESO = new etapa({

    nombre: 'ESO',
    n_cursos: '4'

})

const BACHILLER = new etapa({

    nombre: 'BACHILLER',
    n_cursos: '2'

})


const GRADO_MEDIO = new etapa({

    nombre: 'GRADO_MEDIO',
    n_cursos: '2'

})

const GRADO_SUPERIOR = new etapa({

    nombre: 'GRADO_SUPERIOR',
    n_cursos: '2',
})

  // CREACION DE CICLOS FP 
 
  const GradosMediosFP = ['SMR'];
  GradosMediosFP.map(async c => {
      const newfp = new fp({
          etapa: GRADO_MEDIO,
          nombre: c
      })
  
      await newfp.save();
  })
  
  const GradosSuperioresFP = ['ASIR','DAW','DAM'];
  GradosSuperioresFP.map(async c => {
      const newfp = new fp({
          etapa: GRADO_SUPERIOR,
          nombre: c
      })
  
      await newfp.save();
  })


  Promise.all ([

    ESO.save(),
    BACHILLER.save(),
    GRADO_MEDIO.save(),
    GRADO_SUPERIOR.save(),
])

}

initData()
setTimeout(() => {process.exit(0)},10000)
            
