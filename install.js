// SCRIPT VALHALLA: Script para generar toda la BD del proyecto Odinson

// Orden de ejecucion:

//1. Localidad y Ciudad
//2. Creacion del usuario Admin ODINSON
//3. Etapas: [ESO, BACHILLER, GRADO_MEDIO, GRADO_SUPERIOR]
//4. FP: [SMR, DAM, DAW, ASIR]
//5. Profesores
//6. Asignaturas
//7. Empresas 
//8. Festivos
//9. Alumnos
//10. FCT 

require('dotenv').config()
require('./src/database')

const {Admin , Profesor, Alumno} = require('./src/models/users');
const etapa = require('./src/models/etapa');
const asignaturas = require('./src/models/asignaturas');
const fp = require('./src/models/fp');
const Province = require('./src/models/provinces');
const City = require('./src/models/cities');
const empresa = require('./src/models/empresa');
const fct = require('./src/models/FCT');
const festivo =  require('./src/models/festivos');

async function initData()  {

    // CREACION DE PROFESORES

    const jaen = await Province.findOne({name: 'jaen'});
    const cordoba = await Province.findOne({name: 'cordoba'});

    const localidad_jaen =  await City.findOne({name: 'Jaén'});
    const localidad_martos = await City.findOne({name: 'Martos'});
    const localidad_andujar = await City.findOne({name: 'Andújar'});
    const localidad_cordoba = await City.findOne({name: 'Córdoba'})
    const localidad_ubeda = await City.findOne({name: 'Úbeda'});

    const findFPASIR = await fp.findOne({ nombre: "ASIR"});
    const findFDAW = await fp.findOne({ nombre: "DAW"});
    const findFDAM = await fp.findOne({ nombre: "DAM"});
    const findFPSMR = await fp.findOne({ nombre: "SMR"});

    const findGRADO_MEDIO = await etapa.findOne({ nombre: "GRADO_MEDIO"});
    const findGRADO_SUPERIOR = await etapa.findOne({ nombre: "GRADO_SUPERIOR"});
    const findESO = await etapa.findOne({ nombre: "ESO"});
    const findBACHILLER = await etapa.findOne({ nombre: "BACHILLER"});

    const profesorAlfonso = new Profesor({
   
        firstName: 'Alfonso',
        lastName: 'Muñoz Mora',
        email: 'alfonso@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '10',
        province: jaen,
        city: localidad_jaen,
        tutor: {
            clase: findFPASIR,
            curso: 2,
        },
        tipoDisciplina: 'FP',
    })
    
    const profesorRegina = new Profesor({

        firstName: 'Regina',
        lastName: 'Albin Rodriguez',
        email: 'regina@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '11', 
        province: jaen,
        city: localidad_jaen,
        tipoDisciplina: 'FP',
    })
    

    const profesorFran = new Profesor({

        firstName: 'Fran',
        lastName: 'Marquez Cubero',
        email: 'fran@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '12',
        province: jaen,
        city: localidad_jaen,
        tipoDisciplina: 'FP',
    })
    
    const profesorSonia = new Profesor({
        
        firstName: 'Sonia',
        lastName: 'Mena Delgado',
        email: 'sonia@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '13',
        province: jaen,
        city: localidad_jaen,
        tutor: {
            clase: findFPSMR,
            curso: 2,
        },
        tipoDisciplina: 'FP',
    })

    const profesorAntonio = new Profesor({
        
        firstName: 'Antonio',
        lastName: 'Albin Rodriguez',
        email: 'antonio@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '14', 
        province: jaen,
        city: localidad_jaen,
        tutor: {
            clase: findFDAM,
            curso: 2,
        },
        tipoDisciplina: 'FP',

    })
    
    const profesorJavier = new Profesor({

        firstName: 'Javier',
        lastName: 'Garcia Fernandez',
        email: 'javier@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '15',
        province: jaen,
        city: localidad_jaen,
        tipoDisciplina: 'FP',
    })

    const profesorSole = new Profesor({

        firstName: 'Sole',
        lastName: 'martinez moya',
        email: 'sole@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '16',
        province: jaen,
        city: localidad_jaen,
        tipoDisciplina: 'FP',
        
    })
    

    const profesorJose = new Profesor({

        firstName: 'Jose',
        lastName: 'moreno cortes',
        email: 'jose@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '17',
        province: jaen,
        city: localidad_jaen,
        tipoDisciplina: 'FP',
    })
    

    const profesorAngel = new Profesor({
    
        firstName: 'Angel',
        lastName: 'ejemplo ejemplo',
        email: 'angel@g.educaand.es',
        jefe_departamento: true,
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '18',
        province: jaen,
        city: localidad_jaen,
        tipoDisciplina: 'FP',
    })
    
    const profesorSilverio = new Profesor({

        firstName: 'Silverio',
        lastName: 'ejemplo ejemplo',
        email: 'silverio@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '19',
        province: jaen,
        city: localidad_jaen,
        tutor: {
            clase: findFDAW,
            curso: 2,
        },
        tipoDisciplina: 'FP',

    })

    const profesorPuri = new Profesor({
    
        firstName: 'Puri',
        lastName: 'Moreno Cortes',
        email: 'puri@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '20',
        province: jaen,
        city: localidad_jaen,
        tutor: {
            clase: findESO,
            curso: 4,
        },
        tipoDisciplina: 'Etapa',
    })


    const profesorHermi = new Profesor({

        firstName: 'Hermi',
        lastName: 'Flores Cortes',
        email: 'hermi@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '21',
        province: cordoba,
        city: localidad_cordoba,
        tutor: {
            clase: findESO,
            curso: 2,
        },
        tipoDisciplina: 'Etapa',
    })

    const profesorDaniela = new Profesor({

        firstName: 'Daniela',
        lastName: 'Cortes Garcia',
        email: 'daniela@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '22',
        province: jaen,
        city: localidad_jaen,
        tutor: {
            clase: findESO,
            curso: 1,
        },
        tipoDisciplina: 'Etapa',
    })

    const profesorEmilito = new Profesor({

        firstName: 'Emilito',
        lastName: 'Camacho Cortes',
        email: 'emilito@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '23',
        province: jaen,
        city: localidad_andujar,
        tutor: {
            clase: findESO,
            curso: 3,
        },
        tipoDisciplina: 'Etapa',
    })

    const profesorJorge = new Profesor({

        firstName: 'Jorge',
        lastName: 'Navarrete Secaduras',
        email: 'jorge@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '24',
        province: jaen,
        city: localidad_ubeda,
        tutor: {
            clase: findBACHILLER,
            curso: 1,
        },
        tipoDisciplina: 'Etapa',
    })


    const profesorEli = new Profesor({

        firstName: 'Elisabet',
        lastName: 'Moreno Garcia',
        email: 'eli@g.educaand.es',
        password: 'admin',
        phone: 902123456,  
        calle: 'No se sabe', 
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1, 
        codigo: '25',
        province: jaen,
        city: localidad_jaen,
        tutor: {
            clase: findBACHILLER,
            curso: 2,
        },
        tipoDisciplina: 'Etapa',
    })

     // CREACION DE USUARIO ADMIN ODINSON

     const admin_user = {

        password: 'admin',
        firstName: 'Proyect',
        lastName: 'Odinson',
        email: 'replaceme@me.com',
        phone: 999123987,
        active: true,
    }

    const new_admin = new Admin (admin_user)
    console.log(new_admin) 

    Promise.all ([

        new_admin.save(),
        profesorAlfonso.save(),
        profesorRegina.save(),
        profesorFran.save(),
        profesorSonia.save(),
        profesorJavier.save(),
        profesorSole.save(),
        profesorAntonio.save(),
        profesorJose.save(),
        profesorAngel.save(),
        profesorSilverio.save(),
        profesorJorge.save(),
        profesorPuri.save(),
        profesorHermi.save(),
        profesorEmilito.save(),
        profesorDaniela.save(), 
        profesorEli.save(),
    ]) 
   
    // CREACION DE ASIGNATURAS

    const SistemasSMR1 = new asignaturas({

        nombre_asignatura: 'Sistemas Operativos Monopuesto',
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
        profesor: profesorAlfonso,
        fp: findFPSMR,
        etapa: findGRADO_MEDIO,
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
        profesor: profesorFran,
        fp: findFPSMR,
        etapa: findGRADO_MEDIO,
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
        profesor: profesorJose,
        fp: findFPSMR,
        etapa: findGRADO_MEDIO,
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
        profesor: profesorSole,
        fp: findFPSMR,
        etapa: findGRADO_MEDIO
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
        profesor: profesorAlfonso,
        fp: findFPSMR,
        etapa: findGRADO_MEDIO
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
        profesor: profesorFran,
        fp: findFPSMR,
        etapa: findGRADO_MEDIO
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
        profesor: profesorSonia,
        fp: findFPSMR,
        etapa: findGRADO_MEDIO
    })


    const SeguridadSMR2 = new asignaturas({

        nombre_asignatura: 'Seguridad',
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
        profesor: profesorFran,
        fp: findFPSMR,
        etapa: findGRADO_MEDIO
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
        profesor: profesorAlfonso,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR
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
        profesor: profesorFran,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR
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
        profesor: profesorRegina,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR
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
        profesor: profesorSole,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR
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
        profesor: profesorJose,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR
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
        profesor: profesorAlfonso,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR
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
        profesor: profesorJavier,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR
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
        profesor: profesorRegina,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorSonia,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR
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
        profesor: profesorFran,
        fp: findFPASIR,
        etapa: findGRADO_SUPERIOR
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
        profesor: profesorAntonio,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorRegina,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorAngel,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorSole,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
    })

    const Entornos_Desarollo_DAM1 = new asignaturas({

        nombre_asignatura: 'Entornos de Desarollo',
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
        profesor: profesorAngel,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorRegina,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorAntonio,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorSilverio,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
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

        profesor: profesorSilverio,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorSilverio,
        fp: findFDAM,
        etapa: findGRADO_SUPERIOR,
    })

    const Entorfalses_Desarollo_DAW1 = new asignaturas({

        nombre_asignatura: 'Entornos  de Desarollo',
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
        profesor: profesorAntonio,
        fp: findFDAW,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorSonia,
        fp: findFDAW,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorAngel,
        fp: findFDAW,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorAlfonso,
        fp: findFDAW,
        etapa: findGRADO_SUPERIOR,
    })

    //ASIGNATURAS GRADO SUPERIOR DAW 2º

    const Desarollo_web_DAW2 = new asignaturas({

        nombre_asignatura: 'Desarollo web en entornos cliente',
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
        profesor: profesorSilverio,
        fp: findFDAW,
        etapa: findGRADO_SUPERIOR,
    })

    const Desarollo_web_servidor_DAW2 = new asignaturas({

        nombre_asignatura: 'Desarollo web en entornos de servidor',
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
        profesor: profesorSonia,
        fp: findFDAW,
        etapa: findGRADO_SUPERIOR,
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
        profesor: profesorAngel,
        fp: findFDAW,
        etapa: findGRADO_SUPERIOR,
    })

    // ASIGNATURAS EN LA ESO 1º , 2º , 3º y 4º

    const TIC_ESO1 = new asignaturas({

        nombre_asignatura: 'Tecnologias de la informacion y Comunicacion ESO1 ',
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
        profesor: profesorDaniela,
        etapa: findESO,
    })

    const TIC_ESO2 = new asignaturas({

        nombre_asignatura: 'Tecnologias de la informacion y Comunicacion ESO2',
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
        profesor: profesorEmilito,
        etapa: findESO,
    })

    const TIC_ESO3 = new asignaturas({

        nombre_asignatura: 'Tecnologias de la informacion y Comunicacion ESO3',
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
        profesor: profesorHermi,
        etapa: findESO,
    })

    const TIC_ESO4 = new asignaturas({

        nombre_asignatura: 'Tecnologias de la informacion y Comunicacion ESO4 ',
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
        profesor: profesorPuri,
        etapa: findESO,
    })


    // ASIGNATURAS EN BACHILLER 1º y 2º

    const BACHILLER_TIC_1 = new asignaturas({

        nombre_asignatura: 'Tecnologias de la informacion y Comunicacion BACH1',
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
        profesor: profesorJorge,
        etapa: findBACHILLER,
    })
    
    const BACHILLER_TIC_2 = new asignaturas({

        nombre_asignatura: 'Tecnologias de la informacion y Comunicacion BACH2 ',
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
        profesor: profesorEli,
        etapa: findBACHILLER,
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
        Entornos_Desarollo_DAM1.save(),
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

      // CREACION DE EMPRESAS

      const petroprix = new empresa ({
        name: 'Petroprix',
        familia_profesional: 'Informatica',
        phone: 987123678,
        email: 'petroprix@gmail.com',
        NIF: '8903434F',
        actividad: 'Mantenimiento de gasolieneras',
        representante_certificado_digital: 'Luis Orozco',
        contacto: 'Pepe Moreno', 
        calle: 'Ejemlo',
        tipo_via:'Calle',
        n_via: '1',
        province: jaen,
        city: localidad_martos,
      })
  
      Promise.all ([
  
          petroprix.save(),
      ])


      // CREACION DE FESTIVOS

      const navidad = new festivo ({
        nombre: 'Navidad',
        dia: 25,
        mes: 12,
        nacional: true,
        
      })

      const constitucion_española = new festivo ({
        nombre: 'Constitucion Española',
        dia: 6,
        mes: 12,
        nacional: true,
      })

      const dia_santos = new festivo ({
        nombre: 'Dia de todos los Santos',
        dia: 1,
        mes: 11,
        nacional: true,
      })

      const san_lucas = new festivo ({
        nombre: 'San Lucas',
        dia: 18,
        mes: 10,
        nacional: false,
        province: jaen,
        city: localidad_jaen,
      })

      const santa_catalina = new festivo ({
        nombre: 'Santa Catalina',
        dia: 26,
        mes: 11,
        nacional: false,
        province: jaen,
        city: localidad_jaen,
      })

      
      const san_amador = new festivo ({
        nombre: 'San Amador',
        dia: 5,
        mes: 5,
        nacional: false,
        province: jaen,
        city: localidad_martos,
      })
  
      Promise.all ([
  
          navidad.save(),
          santa_catalina.save(),
          san_lucas.save(),
          constitucion_española.save(),
          dia_santos.save(),
          san_amador.save(),


      ])

      const fecha_nac = new Date(10-10-2012);

      // CREACION DE ALUMNOS

      const ramona = new Alumno ({
        firstName: 'Ramona',
        lastName: 'Eufrasia',
        n_expediente: 343489073,
        DNI: 98712354,
        email: 'ramona@g.educaand.es',
        fecha_nac: fecha_nac,
        calle: 'No se sabe',
        tipo_via: 'Calle',    
        nombre_via: 'Menos se sabe',
        n_via: 1,
        phone: 91209434,
        tipoDisciplina: 'FP',
        disciplina: findFPASIR,
        city: localidad_jaen,
        province: jaen,

      })
  
      Promise.all ([
        ramona.save(),
      ])


      // CREACION DE FCT

 }

initData()
setTimeout(() => {process.exit(0)},10000)
            