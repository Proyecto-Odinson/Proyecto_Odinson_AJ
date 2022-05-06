require('dotenv').config()
require('./src/database')

const etapa = require('./src/models/etapa')
const { User,Profesor } = require('./src/models/Users')
const asignaturas = require('./src/models/asignaturas')
const fp = require('./src/models/fp')
const { disable } = require('express/lib/application')

async function initData() {
    

    const findProfesorAndrea = await Profesor.findOne({ firstName: "Andrea" })
    const findProfesorJose = await Profesor.findOne({ firstName: "Jose" })

    const findFPASIR = await fp.findOne({ falsembre_fp: "ASIR"})
    const findFDAW = await fp.findOne({ falsembre_fp: "DAW"})
    const findFDAM = await fp.findOne({ falsembre_fp: "DAM"})
    const findFPSMR = await fp.findOne({ falsembre_fp: "SMR"})


    const findEtapaSuperior = await etapa.findOne({ falsembre_etapa: "GRADO_SUPERIOR"})
    const findEtapaMedio = await etapa.findOne({ falsembre_etapa: "GRADO_MEDIO"})
    const findEtapaESO = await etapa.findOne({ falsembre_etapa: "ESO"})
    const findEtapaBachiller = await etapa.findOne({ falsembre_etapa: "BACHILLER"})

    //ASIGNATURAS SMR GRADO MEDIO 1ºAÑO

    const SistemasSMR1 = new asignaturas({

        nombre_asignatura: 'Sistemas Operativos Mofalsepuesto',
        siglas: 'SOM',
        curso: 1,
        horario: [
            {
                dia_semana: 'Lunes ',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '6',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '6',
                desdoble: 'false'
            },

        ],
        profesor: [findProfesorAndrea],
        fp: [findFPSMR],
        etapa: [findEtapaMedio],
    })

    const RedesSMR1 = new asignaturas({

        nombre_asignatura: 'Redes Locales',
        siglas: 'RL',
        curso: 1,
        horario: [
            {
                dia_semana: 'Martes ',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '6',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '6',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '6',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPSMR],
        etapa: [findEtapaMedio],
    })

    const MontajeSMR1 = new asignaturas({

        nombre_asignatura: 'Montaje y Mantenimiento de Equipo',
        siglas: 'MME',
        curso: 1,
        horario: [
            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '6',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '6',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPSMR],
        etapa: [findEtapaMedio],
    })


    const Aplicaciones_OfimaticasSMR1 = new asignaturas({

        nombre_asignatura: 'Aplicaciones Ofimaticas',
        siglas: 'AO',
        curso: 1,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '6',
                desdoble: 'false'
            },

            {
                dia_semana: 'Martes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '6',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '6',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPSMR],
        etapa: [findEtapaMedio],
    })


     //ASIGNATURAS SMR GRADO MEDIO 2ºAÑO

     const Sistemas_en_RedSMR2 = new asignaturas({

        nombre_asignatura: 'Sistemas Operativos en Red',
        siglas: 'SOR',
        curso: 2,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '7',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '7',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '7',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPSMR],
        etapa: [findEtapaMedio],
    })

    const Servicios_en_RedSMR2 = new asignaturas({

        nombre_asignatura: 'Servicios en Red',
        siglas: 'SR',
        curso: 2,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '7',
                desdoble: 'false'
            },

            {
                dia_semana: 'Martes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '7',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '7',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPSMR],
        etapa: [findEtapaMedio],
    })


    const Aplicaciones_WebSMR2 = new asignaturas({

        nombre_asignatura: 'Aplicaciones Web',
        siglas: 'AW',
        curso: 2,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '7',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '7',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPSMR],
        etapa: [findEtapaMedio],
    })


    const SeguridadSMR2 = new asignaturas({

        nombre_asignatura: 'Montajes y Mantenimientos de Equipos',
        siglas: 'SAD',
        curso: 2,
        horario: [
            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '7',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '7',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPSMR],
        etapa: [findEtapaMedio],
    })  


    //ASIGNATURAS GRADO SUPERIOR ASIR 1º

    const ISO_ASIR1 = new asignaturas({

        nombre_asignatura: 'Implementacion de Sistemas Operativos',
        siglas: 'ISO',
        curso: 1,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '8',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '8',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })

    const PAR_ASIR1 = new asignaturas({

        nombre_asignatura: 'Planificacion y Administracion de Redes',
        siglas: 'PAR',
        curso: 1,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '8',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '8',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })
    
    const GBD_ASIR1 = new asignaturas({

        nombre_asignatura: 'Gestion de Base de Datos',
        siglas: 'GBD',
        curso: 1,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '8',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '8',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })

    const LMSGI_ASIR1 = new asignaturas({

        nombre_asignatura: 'Lenguaje de Marcas y Sistemas de Gestion de la Informacion',
        siglas: 'LMSGI',
        curso: 1,
        horario: [
            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '8',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '8',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })

    const FH_ASIR1 = new asignaturas({

        nombre_asignatura: 'Fundamentos del Hardware',
        siglas: 'LMSGI',
        curso: 1,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '8',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '8',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })


    //ASIGNATURAS GRADO SUPERIOR ASIR 2º

    const ASO_ASIR2 = new asignaturas({

        nombre_asignatura: 'Administracion de Sistemas Operativos',
        siglas: 'ASO',
        curso: 2,
        horario: [
            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '9',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '9',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })

    const SRI_ASIR2 = new asignaturas({

        nombre_asignatura: 'Servicios de Redes e Internet',
        siglas: 'SRI',
        curso: 2,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '9',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '9',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })
    
    const ASGBD_ASIR2 = new asignaturas({

        nombre_asignatura: 'Administracion de Sistemas Gestores de Base de Datos',
        siglas: 'ASGBD',
        curso: 2,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '9',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '9',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })

    const IAW_ASIR2 = new asignaturas({

        nombre_asignatura: 'Implantacion de Aplicaciones Web',
        siglas: 'IAW',
        curso: 2,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '9',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '9',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })

    const SAD_ASIR2 = new asignaturas({

        nombre_asignatura: 'Seguridad y Alta Disponibilidad',
        siglas: 'SAD',
        curso: 2,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '9',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '9',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        fp: [findFPASIR],
        etapa: [findEtapaSuperior],
    })

     //ASIGNATURAS GRADO SUPERIOR DAM 1º

     const Sistema_Informaticos_DAM1 = new asignaturas({

        nombre_asignatura: 'Sistemas Informaticos',
        siglas: 'SM',
        curso: 1,
        horario: [
            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '10',
                desdoble: 'false'
            },
            
        ],
        profesor: [findProfesorJose],
        fp: [findFDAM],
        etapa: [findEtapaSuperior],
    })

      const Bases_datos_DAM1 = new asignaturas({

        nombre_asignatura: 'Base de Datos',
        siglas: 'BD',
        curso: 1,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '10',
                desdoble: 'false'
            },
            
        ],
        profesor: [findProfesorJose],
        fp: [findFDAM],
        etapa: [findEtapaSuperior],
    })
    
    const Programacion_DAM1 = new asignaturas({

        nombre_asignatura: 'Programacion',
        siglas: 'PM',
        curso: 1,
        horario: [
             {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '10',
                desdoble: 'false'
            },
            
        ],
        profesor: [findProfesorJose],
        fp: [findFDAM],
        etapa: [findEtapaSuperior],
    })

    const Lenguaje_Marcas_DAM1 = new asignaturas({

        nombre_asignatura: 'Lenguajes de marcas y sistemas de gestión de información',
        siglas: 'LMSG',
        curso: 1,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '10',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '10',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAM],
        etapa: [findEtapaSuperior],
    })

    const Entorfalse_Desarollo_DAM1 = new asignaturas({

        nombre_asignatura: 'Entorfalse de Desarollo',
        siglas: 'ED',
        curso: 1,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '10',
                desdoble: 'false'
            },

            {
                dia_semana: 'Martes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '10',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '10',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAM],
        etapa: [findEtapaSuperior],
    })

     //ASIGNATURAS GRADO SUPERIOR DAM 2º

     const AccesoDatos_DAM2 = new asignaturas({

        nombre_asignatura: 'Acceso a Datos',
        siglas: 'AD',
        curso: 2,
        horario: [
            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '11',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '11',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '11',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAM],
        etapa: [findEtapaSuperior],
    })

    
    const Desarollo_Interfaces_DAM2 = new asignaturas({

        nombre_asignatura: 'Desarollo de Interfaces',
        siglas: 'DI',
        curso: 2,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '11',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '11',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '11',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAM],
        etapa: [findEtapaSuperior],
    })

    
    const Programacion_multimedia_DAM2 = new asignaturas({

        nombre_asignatura: 'Programacion y multimedia y dispositivos moviles',
        siglas: 'PMDM',
        curso: 2,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '11',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '11',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '11',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAM],
        etapa: [findEtapaSuperior],
    })

    
    const Programacion_servicios_DAM2 = new asignaturas({

        nombre_asignatura: 'Programacion de servicios y procesos',
        siglas: 'PSP',
        curso: 2,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '11',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '11',
                desdoble: 'false'
            },

    
        ],

        profesor: [findProfesorJose],
        fp: [findFDAM],
        etapa: [findEtapaSuperior],
    })

    //ASIGNATURAS GRADO SUPERIOR DAW 1º

    const Base_datos_DAW1 = new asignaturas({

        nombre_asignatura: 'Base de Datos',
        siglas: 'BD',
        curso: 1,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '12',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAW],
        etapa: [findEtapaSuperior],
    })

    const Entorfalses_Desarollo_DAW1 = new asignaturas({

        nombre_asignatura: 'Entorfalses de Desarollo',
        siglas: 'ED',
        curso: 1,
        horario: [
            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '12',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAW],
        etapa: [findEtapaSuperior],
    })

    const Lenguaje_Marcas_DAW1 = new asignaturas({

        nombre_asignatura: 'Lenguaje de Marcas  y Sistemas de Gestion de Informacion',
        siglas: 'LMSGI',
        curso: 1,
        horario: [
            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '12',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAW],
        etapa: [findEtapaSuperior],
    })

    const Progrmacion_DAW1 = new asignaturas({

        nombre_asignatura: 'Programacion',
        siglas: 'PG',
        curso: 1,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '12',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAW],
        etapa: [findEtapaSuperior],
    })

    const sistemas_DAW1 = new asignaturas({

        nombre_asignatura: 'Sistemas Informaticos',
        siglas: 'SM',
        curso: 1,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '12',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '12',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAW],
        etapa: [findEtapaSuperior],
    })

    //ASIGNATURAS GRADO SUPERIOR DAW 2º

    const Desarollo_web_DAW2 = new asignaturas({

        nombre_asignatura: 'Desarollo web en entorfalse cliente',
        siglas: 'DWEC',
        curso: 2,
        horario: [
            {
                dia_semana: 'Miercoles',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '13',
                desdoble: 'false'
            },

            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '13',
                desdoble: 'false'
            },

            {
                dia_semana: 'Viernes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '13',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAW],
        etapa: [findEtapaSuperior],
    })

    const Desarollo_web_servidor_DAW2 = new asignaturas({

        nombre_asignatura: 'Desarollo web en entorfalse servidor',
        siglas: 'DWES',
        curso: 2,
        horario: [

            {
                dia_semana: 'Lunes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '13',
                desdoble: 'false'
            },

            {
                dia_semana: 'Martes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '13',
                desdoble: 'false'
            },

            {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '13',
                desdoble: 'false'
            },


            {
                dia_semana: 'Jueves',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '13',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAW],
        etapa: [findEtapaSuperior],
    })

    const Diseño_interfaces_DAW2 = new asignaturas({

        nombre_asignatura: 'Diseño de interfaces web',
        siglas: 'DIW',
        curso: 2,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '13',
                desdoble: 'false'
            },

            {
                dia_semana: 'Martes',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '13',
                desdoble: 'false'
            },


            {
                dia_semana: 'Viernes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '13',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        fp: [findFDAW],
        etapa: [findEtapaSuperior],
    })

    // ASIGNATURAS EN LA ESO 1º , 2º , 3º y 4º

    const TIC_ESO1 = new asignaturas({

        nombre_asignatura: 'Tecfalselogias de la informacion y Comunicacion',
        siglas: 'TIC',
        curso: 1,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '08:00',
                hora_fin: '10:00',
                aula: '14',
                desdoble: 'yes'
            },
            {
                dia_semana: 'Miercoles',
                hora_inicio: '09:00',
                hora_fin: '11:00',
                aula: '14',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorJose],
        etapa: [findEtapaESO],
    })

    const TIC_ESO2 = new asignaturas({

        nombre_asignatura: 'Tecfalselogias de la informacion y Comunicacion',
        siglas: 'TIC',
        curso: 2,
        horario: [
            {
                dia_semana: 'Juves',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '15',
                desdoble: 'false'
            },
            {
                dia_semana: 'Viernes',
                hora_inicio: '11:30',
                hora_fin: '13:30',
                aula: '15',
                desdoble: 'yes'
            },
        ],
        profesor: [findProfesorJose],
        etapa: [findEtapaESO],
    })

    const TIC_ESO3 = new asignaturas({

        nombre_asignatura: 'Tecfalselogias de la informacion y Comunicacion',
        siglas: 'TIC',
        curso: 3,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '08:00',
                hora_fin: '09:00',
                aula: '16',
                desdoble: 'yes'
            },
            {
                dia_semana: 'Jueves',
                hora_inicio: '12:30',
                hora_fin: '13:30',
                aula: '16',
                desdoble: 'yes'
            },
        ],
        profesor: [findProfesorJose],
        etapa: [findEtapaESO],
    })

    const TIC_ESO4 = new asignaturas({

        nombre_asignatura: 'Tecfalselogias de la informacion y Comunicacion',
        siglas: 'TIC',
        curso: 4,
        horario: [
            {
                dia_semana: 'Martes',
                hora_inicio: '10:00',
                hora_fin: '12:30',
                aula: '17',
                desdoble: 'false'
            },
            {
                dia_semana: 'Jueves',
                hora_inicio: '09:00',
                hora_fin: '11:00',
                aula: '17',
                desdoble: 'yes'
            },
        ],
        profesor: [findProfesorJose],
        etapa: [findEtapaESO],
    })


    // ASIGNATURAS EN BACHILLER 1º y 2º

    const BACHILLER_TIC_1 = new asignaturas({

        nombre_asignatura: 'Tecfalselogias de la informacion y Comunicacion',
        siglas: 'TIC',
        curso: 1,
        horario: [
            {
                dia_semana: 'Lunes',
                hora_inicio: '10:00',
                hora_fin: '11:00',
                aula: '18',
                desdoble: 'false'
            },
            {
                dia_semana: 'Jueves',
                hora_inicio: '13:30',
                hora_fin: '14:30',
                aula: '18',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        etapa: [findEtapaBachiller],
    })
    
    const BACHILLER_TIC_2 = new asignaturas({

        nombre_asignatura: 'Tecfalselogias de la informacion y Comunicacion',
        siglas: 'TIC',
        curso: 2,
        horario: [
            {
                dia_semana: 'Miercoles',
                hora_inicio: '12:30',
                hora_fin: '14:30',
                aula: '19',
                desdoble: 'false'
            },
            {
                dia_semana: 'Viernes',
                hora_inicio: '09:00',
                hora_fin: '11:00',
                aula: '19',
                desdoble: 'false'
            },
        ],
        profesor: [findProfesorAndrea],
        etapa: [findEtapaBachiller]
    })

    Promise.all([
    
        SistemasSMR1.save(),
        RedesSMR1.save(),
        MontajeSMR1.save(),
        Aplicaciones_OfimaticasSMR1.save(),

        Sistemas_en_RedSMR2.save(),
        Servicios_en_RedSMR2.save(),
        Aplicaciones_WebSMR2.save(),
        SeguridadSMR2.save(),

        ISO_ASIR1.save(),
        FH_ASIR1.save(),
        GBD_ASIR1.save(),
        PAR_ASIR1.save(),
        LMSGI_ASIR1.save(),

        ASO_ASIR2.save(),
        ASGBD_ASIR2.save(),
        IAW_ASIR2.save(),
        SAD_ASIR2.save(),
        SRI_ASIR2.save(),

        Bases_datos_DAM1.save(),
        Programacion_DAM1.save(),
        Lenguaje_Marcas_DAM1.save(),
        Entorfalse_Desarollo_DAM1.save(),
        Sistema_Informaticos_DAM1.save(),

        AccesoDatos_DAM2.save(),
        Desarollo_Interfaces_DAM2.save(),
        Programacion_servicios_DAM2.save(),
        Programacion_multimedia_DAM2.save(),


        sistemas_DAW1.save(),
        Base_datos_DAW1.save(),
        Progrmacion_DAW1.save(),
        Lenguaje_Marcas_DAW1.save(),
        Entorfalses_Desarollo_DAW1.save(),


        Desarollo_web_DAW2.save(),
        Diseño_interfaces_DAW2.save(),
        Desarollo_web_servidor_DAW2.save(),


        TIC_ESO1.save(),
        TIC_ESO2.save(),
        TIC_ESO3.save(),
        TIC_ESO4.save(),

        BACHILLER_TIC_1.save(),
        BACHILLER_TIC_2.save(),
       
    ])
    
}

initData()

setTimeout(() => {process.exit(0)},10000)