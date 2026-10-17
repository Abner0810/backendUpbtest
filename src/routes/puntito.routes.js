const { Router } = require('express');
const puntitoController = require('../controllers/puntito.controller');

const router = Router();

router.get('/', puntitoController.listar);
router.get('/:usuario', puntitoController.obtener);
router.post('/', puntitoController.sumar);

module.exports = router;
