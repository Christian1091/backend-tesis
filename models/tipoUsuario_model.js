const { Schema, model } = require('mongoose');

/**Esta es la definicion de cada uno de los registros que van a estar dentro de mi tabla */
const TipoUsuarioSchema = Schema({
    tipo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: false
    }
});

/**Aqui quito el atributo password del json para que no muestre */
TipoUsuarioSchema.method('toJSON', function() {
    const { __V, ...object } = this.toObject();
    return object;
})

/**Ahora vamos a implementar el modelo */
module.exports = model('TipoUsuario', TipoUsuarioSchema);