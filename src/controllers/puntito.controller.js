const puntitoService = require('../services/puntito.service');
const { validarUsuario, sumarPuntitoDto, puntitoResponseDto } = require('../dtos/puntito.dto');

// Express 5 captura los errores de funciones async y los manda al manejador de errores,
// por eso no hace falta try/catch aquí

const listar = async (req, res) => {
    const puntitos = await puntitoService.listar();
    res.json(puntitos.map(puntitoResponseDto));
};

const obtener = async (req, res) => {
    const usuario = validarUsuario(req.params.usuario);
    const puntito = await puntitoService.obtenerPorUsuario(usuario);
    res.json(puntitoResponseDto(puntito));
};

const sumar = async (req, res) => {
    const { usuario } = sumarPuntitoDto(req.body);
    const puntito = await puntitoService.sumar(usuario);
    res.status(201).json(puntitoResponseDto(puntito));
};

module.exports = { listar, obtener, sumar };
