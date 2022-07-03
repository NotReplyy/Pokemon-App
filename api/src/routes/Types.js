const { Router } = require('express');
const { getAllTypes} = require('../Controller/TypeController.js')


const router = Router();

router.get('/', getAllTypes);

module.exports = router;