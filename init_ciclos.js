require('dotenv').config()
require('./src/database')

const fp = require('./src/models/fp')
const etapa = require('./src/models/etapa')

async function initData() {

    // ETAPAS

    const ESO = new etapa({

        nombre_etapa: 'ESO',
        n_cursos: '4'

    })

    const BACHILLER = new etapa({

        nombre_etapa: 'BACHILLER',
        n_cursos: '2'

    })


    const GRADO_MEDIO = new etapa({

        nombre_etapa: 'GRADO_MEDIO',
        n_cursos: '2'

    })

    const GRADO_SUPERIOR = new etapa({

        nombre_etapa: 'GRADO_SUPERIOR',
        n_cursos: '2',
    })


    //CICLOS 

   const GradosMediosFP = ['SMR'];
    GradosMediosFP.map(async c => {
        const newfp = new fp({
            etapa: GRADO_MEDIO._id,
            nombre_fp: c
        })
    
        await newfp.save();
    })
    
    const GradosSuperioresFP = ['ASIR','DAW','DAW'];
    GradosSuperioresFP.map(async c => {
        const newfp = new fp({
            etapa: GRADO_SUPERIOR._id,
            nombre_fp: c
        })
    
        await newfp.save();
    })
    

    
    Promise.all([
    
        ESO.save(),
        BACHILLER.save(),
        GRADO_MEDIO.save(),
        GRADO_SUPERIOR.save()
    ])
    
}

initData()

setTimeout(() => {process.exit(0)},10000)