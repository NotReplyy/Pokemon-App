const { Router } = require('express')
const { getPokemonById, postPokemon, getAllPokemon, allPokeId } = require('../Controller/PokeController.js')


const router = Router()


router.get('/', getAllPokemon)
router.post('/', postPokemon)
router.get('/:id', getPokemonById)


module.exports = router