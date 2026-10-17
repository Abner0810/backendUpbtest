const HttpError = require('../utils/http-error');

const validarUsuario = (usuario) => {
    if (typeof usuario !== 'string' || usuario.trim() === '') {
        throw new HttpError(400, '"usuario" debe ser un texto no vacío');
    }
    const limpio = usuario.trim();
    if (limpio.length > 100) throw new HttpError(400, '"usuario" no puede superar 100 caracteres');
    return limpio;
};

// DTO de entrada para POST: solo deja pasar el campo permitido
const sumarPuntitoDto = (body) => {
    const { usuario } = body || {};
    return { usuario: validarUsuario(usuario) };
};

// DTO de salida: lo que la API devuelve al cliente
const puntitoResponseDto = (puntito) => ({
    usuario: puntito.usuario,
    puntos: puntito.puntos,
    updatedAt: puntito.updatedAt ?? null,
});

module.exports = { validarUsuario, sumarPuntitoDto, puntitoResponseDto };
