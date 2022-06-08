const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: false
    }
});

EmpresaSchema.method('toJSON', function() {
    const { __V, ...object } = this.toObject();
    return object;
});

module.exports = model('Empresa', EmpresaSchema);