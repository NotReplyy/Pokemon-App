const { Router } = require('express')
const { getPokemonById, postPokemon, getAllPokemon, deletePokemonById } = require('../Controller/PokeController.js')


const router = Router()


router.get('/', getAllPokemon)
router.post('/', postPokemon)
router.get('/:id', getPokemonById)
router.delete('/:id', deletePokemonById)


module.exports = router