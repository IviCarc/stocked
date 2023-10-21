const z = require("zod")


const yup = require("yup");


const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

const registerSchema = yup.object({
    username: yup.string().min(4).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

const productoSchema = yup
    .object({
        producto: yup.string().min(4, "Mínimo 4 caracteres").required(),
        precio: yup.number().min(0).required(),
        descripcion: yup.string().min(4, "Mínimo 4 caracteres").required(),
        cantidadDisponible: yup.number().integer("Debe ingresar números enteros").min(0).required(),
        categoria: yup.string().required("Debe seleccionar una categoria"),
        modelo: yup.string(),
        // imagen: yup.mixed()
        //     .test("test", "La imagen debe tener formato JPG o PNG", value => {
        //         return value.type === "image/jpeg" || value.type === "image/png"
        //     })
    })
    .required()

module.exports = { registerSchema, loginSchema, productoSchema }