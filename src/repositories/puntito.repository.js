const pool = require('../config/db');
const Puntito = require('../entities/puntito.entity');

const findAll = async () => {
    const { rows } = await pool.query('SELECT * FROM puntitos ORDER BY puntos DESC, usuario');
    return rows.map(Puntito.fromRow);
};

const findByUsuario = async (usuario) => {
    const { rows } = await pool.query('SELECT * FROM puntitos WHERE usuario = $1', [usuario]);
    return Puntito.fromRow(rows[0]);
};

// Suma puntos al usuario; si no existe lo crea. Devuelve el registro actualizado.
const addPuntos = async (usuario, cantidad) => {
    const { rows } = await pool.query(
        `INSERT INTO puntitos (usuario, puntos)
         VALUES ($1, $2)
         ON CONFLICT (usuario)
         DO UPDATE SET puntos = puntitos.puntos + EXCLUDED.puntos, updated_at = NOW()
         RETURNING *`,
        [usuario, cantidad]
    );
    return Puntito.fromRow(rows[0]);
};

module.exports = { findAll, findByUsuario, addPuntos };
