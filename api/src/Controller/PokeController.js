const axios = require('axios')
const e = require('express')
const { Pokemon, Type } = require('../db')



//  FETCH DE 40 POKEMON DE LA API 

const getPokeAPi = async (req, res, next) => {
    try {
        const response = await axios('https://pokeapi.co/api/v2/pokemon?limit=40')
        let { data } = response
        let pokemonUrls = data.results.map(d => d.url)
        let getPokemonData = await Promise.all(pokemonUrls.map((endpoint) => axios.get(endpoint)))
        getPokemonData = getPokemonData.map(pokemon => {
            let { data } = pokemon
            return {
                id: data.id,
                name: data.name,
                types: data.types.map(t => t.type.name),
                image: data.sprites.other["official-artwork"].front_default,
                // hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                // defense: data.stats[2].base_stat,
                // speed: data.stats[5].base_stat,
                // height: data.height,
                // weight: data.weight
            }
        })
        return getPokemonData
    }
    catch (err) {
        console.log('se rompio todo')
        next(err)
    }
}


// FETCH DE POKEMON DB

const getDbInfo = async () => {
    let dbData = await Pokemon.findAll({ include: Type })
    const pokemonsDb = dbData.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image,
            types: e.types.map(e => e.name),
            attack: e.attack,
        }
    })
    return pokemonsDb
}




// POKEMON DE API + POKEMON DE DB

const joinAllPokemon = async () => {
    let apiInfo = await getPokeAPi();
    let dbInfo = await getDbInfo();
    let infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
}

// GET DE TODOS LOS POKEMON

const getAllPokemon = async (req, res, next) => {
    const { name } = req.query;
    try {
        if (name) {
            const dbInfo = await Pokemon.findAll({
                where: {
                    name: name,
                },
                include: {
                    model: Type
                }
            })
            if (dbInfo != 0) {
                let resDb = dbInfo.map(p => {
                    return {
                        id: p.id,
                        name: p.name,
                        types: p.types.map(e => e.name),
                        image: p.image,
                        hp: p.hp,
                        attack: p.attack,
                        defense: p.defense,
                        speed: p.speed,
                        height: p.height,
                        weight: p.weight
                    }
                })
                res.status(200).send(resDb)

            } else {
                const pokeApi = (await axios(`https://pokeapi.co/api/v2/pokemon/${name}`))
                let resApi = [{
                    id: pokeApi.data.id,
                    name: pokeApi.data.name,
                    types: pokeApi.data.types.map(t => t.type.name),
                    image: pokeApi.data.sprites.other["official-artwork"].front_default,
                    hp: pokeApi.data.stats[0].base_stat,
                    attack: pokeApi.data.stats[1].base_stat,
                    defense: pokeApi.data.stats[2].base_stat,
                    speed: pokeApi.data.stats[5].base_stat,
                    height: pokeApi.data.height,
                    weight: pokeApi.data.weight
                }]
                res.status(200).send(resApi)
            }

        } else {
            try {
                const allPokemon = await joinAllPokemon();
                res.json(allPokemon)
            } catch (error) {
                next(error)
            }
        }
    }
    catch (error) {
        res.status(404).send({ msg: "Pokemon's name not found" })
    }
}

// FETCH DE POKEMON POR ID

async function getPokemonById(req, res, next) {
    const { id } = req.params
    let pokeId;
    if (id.length > 10) {
        try {
            const responseDb = await Pokemon.findByPk(id, { include: Type })
            pokeId = {
                id: responseDb.id,
                name: responseDb.name,
                types: responseDb.types.map(e => e.name),
                image: responseDb.image,
                hp: responseDb.hp,
                attack: responseDb.attack,
                defense: responseDb.defense,
                speed: responseDb.speed,
                height: responseDb.height,
                weight: responseDb.weight
            }
            res.json(pokeId)
        } catch (error) {
            next(error)
        }
    } else {
        try {
            const resPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            pokeId = {
                id: resPoke.data.id,
                name: resPoke.data.name,
                types: resPoke.data.types.map(t => t.type.name),
                image: resPoke.data.sprites.other["official-artwork"].front_default,
                hp: resPoke.data.stats[0].base_stat,
                attack: resPoke.data.stats[1].base_stat,
                defense: resPoke.data.stats[2].base_stat,
                speed: resPoke.data.stats[5].base_stat,
                height: resPoke.data.height,
                weight: resPoke.data.weight
            }
            res.status(200).send(pokeId)
        }
        catch (err) {
            res.status(404).send({ msg: 'ID Pokemon not found' })
        }
    }
}


// AGREGAR LOS POKEMON CREADOS A LA BASE DE DATOS
const postPokemon = async (req, res, next) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, image, types } = req.body
        const newPokemon = await Pokemon.create({
            name: name.toLowerCase(),
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image,           
        })
        await newPokemon.addTypes(types);
        res.send(newPokemon)
    } catch (error) {
        // console.log('estoy en el catch');
        next(error)
    }
}







module.exports = {
    getAllPokemon,
    getPokemonById,
    postPokemon,
   // allPokeId
}