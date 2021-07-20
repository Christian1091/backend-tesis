/**Modelo de mongoose que nos permitira poner ciertas restricciones a que mi BD
 * luzca de la manera que yo quiero
 */

const { Schema, model } = require('mongoose');

/**Esta es la definicion de cada uno de los registros que van a estar dentro de mi tabla */
const PreguntaSchema = Schema({
    descripcion: {
        type: String,
        required: true
    },
    puntajePregunta: {
        type: Number,
        //required: true
    },
    listRespuestas: {
        type: Schema.Types.Array,
        required: true
    }
    // cuestionarioId: {
    //      type: Schema.Types.ObjectId,
    //      ref: 'Cuestionario', 
    //      required: true
    //  },
});

/**Aqui quito el atributo password del json para que no muestre */
PreguntaSchema.method('toJSON', function() {
    const { __V, ...object } = this.toObject();
    return object;
})

/**Ahora vamos a implementar el modelo */
module.exports = model('Pregunta', PreguntaSchema);