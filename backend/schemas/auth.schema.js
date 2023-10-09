const z = require("zod")

const registerSchema = z.object({
    username: z.string({
        required_error:'Username es requerido'
    }
    ),
    email: z.string({
        required_error:'Email es requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Password es requerido'
    })
    .min(6,{
        message: 'La contraseña debe ser de 6 caracteres o más'
    }),
})

const loginSchema = z.object({
    email: z.string({
        required_error:'Email es requerido'
    }).email({
        message: 'Email invalido'
    }),
    password: z.string({
        required_error: 'Password es requerido'
    })
    .min(6,{
        message: 'La contraseña debe ser de 6 caracteres o más'
    }),
})

module.exports = {registerSchema, loginSchema}