const { Schema, model } = require('mongoose');

/**Esta es la definicion de cada uno de los registros que van a estar dentro de mi tabla */
const AreaSchema = Schema({
    area: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: false
    },
    valor: 
    {
        type: Number,
        required: true
    }

});

/**Aqui quito el atributo password del json para que no muestre */
AreaSchema.method('toJSON', function() {
    const { __V, ...object } = this.toObject();
    return object;
})

/**Ahora vamos a implementar el modelo */
module.exports = model('Area', AreaSchema);