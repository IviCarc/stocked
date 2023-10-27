const z = require("zod")


const yup = require("yup");


const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

const registerSchema = yup.object({
    username: yup.string().min(4).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6, "Contraseña debe tener al menos 6 caracteres").required()
})

const productoSchema = yup
    .object({
        producto: yup.string().min(4, "Producto debe tener al menos 4 caracteres").matches(/^[A-Za-z\s]+$/, "Sólo puede ingresar caracteres alfabéticos").required(),
        precio: yup.number().min(0).required(),
        descripcion: yup.string().min(4, "Descripcion debe tener al menos 4 caracteres").matches(/^[A-Za-z\s]+$/, "Sólo puede ingresar caracteres alfabéticos").required(),
        cantidadDisponible: yup.number().integer("Cantidad disponible debe ser un numero entero").min(0, "Cantidad disponible debe ser 0 o más").required(),
        categoria: yup.string().min(4, "Categoria debe tener al menos 3 caracteres").matches(/^[A-Za-z\s]+$/, "Sólo puede ingresar caracteres alfabéticos").required("Debe seleccionar una categoria"),
    })
    .required()

const categoriaSchema = yup.object({
    categoria: yup.string().min(4, "Mínimo 4 caracteres").matches(/^[A-Za-z\s]+$/, "Sólo puede ingresar caracteres alfabéticos").required()
})

const modeloSchema = yup
    .object({
        nombreModelo: yup.string().min(4, "Debe ingresar al menos 3 caracteres").matches(/^[A-Za-z\s]+$/, "Sólo puede ingresar caracteres alfabéticos").required(),
        categoria: yup.string().matches(/^[A-Za-z\s]+$/, "Sólo puede ingresar caracteres alfabéticos").required("Debe seleccionar una categoria"),
        caracteristicas: yup.array()
            .of(
                yup.string()
                .min(4, "Debe ingresar al menos 4 caracteres")
                .matches(/^[A-Za-z\s]+$/, "Sólo puede ingresar caracteres alfabéticos"))
            .required("Tienes que ingresar al menos una caracteristica").min(1, "Debe tener al menos una característica"),
    })
    .required()

module.exports = { registerSchema, loginSchema, productoSchema, modeloSchema, categoriaSchema };