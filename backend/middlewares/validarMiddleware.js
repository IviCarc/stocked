const validateSchema = (schema) => async (req, res, next) => {
    console.log(req.body)
    try {
        // console.log(req)
        await schema.validate(req.body)
        next()
    } catch (error) {
        console.error(error)
        return res.status(400).json(error.errors.map(error => error.message))
    }
}

module.exports = { validateSchema }