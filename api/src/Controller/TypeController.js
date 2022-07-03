const axios = require('axios');
const { Type } = require('../db')


const getAllTypes = async (req, res, next) => {
    try {
        const typesCant =  await Type.count();       
        if (!typesCant) {
            const types = await axios.get('https://pokeapi.co/api/v2/type/');
            let typesApi = types.data.results      
            await Type.bulkCreate(typesApi)
            res.send(typesApi.map(p => p.name));
        } else {
            let typesDb = await Type.findAll()
            let typesDbase = typesDb.map(t => {
                return {
                    id: t.id,
                    name: t.name,
                }
            })
            res.send(typesDbase)
        }
    }
    catch (err) {
        console.log('se rompio todo');
        next(err)
    }
}


module.exports = {getAllTypes}