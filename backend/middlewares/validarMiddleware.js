const validateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json(error.inner.map(e => {
            return {
                "field": e.path,
                "message": e.errors[0]
            }
        }))
    }
}

module.exports = { validateSchema }