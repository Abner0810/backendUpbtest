const puntitoRepository = require('../repositories/puntito.repository');

const PUNTOS_POR_CLIC = 1;

const listar = () => puntitoRepository.findAll();

// Si el usuario todavía no tiene puntitos, devuelve 0 en lugar de 404
const obtenerPorUsuario = async (usuario) => {
    const puntito = await puntitoRepository.findByUsuario(usuario);
    return puntito ?? { usuario, puntos: 0, updatedAt: null };
};

const sumar = (usuario) => puntitoRepository.addPuntos(usuario, PUNTOS_POR_CLIC);

module.exports = { listar, obtenerPorUsuario, sumar };
