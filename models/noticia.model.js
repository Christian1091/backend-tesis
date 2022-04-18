const { Schema, model } = require('mongoose');

const NoticiaSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    fechaCreacion: {
       type: Date,
       default: Date.now()
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    }, 
     nombreImagen: {
        type: String,
        
    }
});
module.exports = model('Noticia', NoticiaSchema);
