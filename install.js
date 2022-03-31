router.get('/install', async (req, res) => {
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
    

    Promise.all([
        jaen.save(),
        cordoba.save(),
        granada.save(),
    ])
    
    res.send('Installed');
})