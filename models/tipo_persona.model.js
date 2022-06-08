const { Schema, model } = require('mongoose');

const TipoPersonaSchema = Schema({
    tipo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: false
    }
});

TipoPersonaSchema.method('toJSON', function() {
    const { __V, ...object } = this.toObject();
    return object;
});

module.exports = model('TipoPersona', TipoPersonaSchema);