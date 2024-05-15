const {Schema,model} = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true,'El rol es obligatorio...'],
        unique: true
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    fecha_creacion: {
        type: Date,
		default: Date.now,
		required: 'Debe tener una fecha de Creacion.'
    },
    fecha_actualizacion: {type: Date},
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

RoleSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

module.exports = model('Role',RoleSchema);