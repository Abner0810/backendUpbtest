class Puntito {
    constructor(id, usuario, puntos, updatedAt) {
        this.id = id;
        this.usuario = usuario;
        this.puntos = Number(puntos);
        this.updatedAt = updatedAt;
    }

    static fromRow(row) {
        if (!row) return null;
        return new Puntito(row.id, row.usuario, row.puntos, row.updated_at);
    }
}

module.exports = Puntito;
