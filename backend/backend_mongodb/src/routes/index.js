const {Router} = require('express');
const router = Router();
const { getCities, getStates } = require('../controllers/index')
//API mongodb
router.get('/cities',getCities);
router.get('/states',getStates);

module.exports = router;