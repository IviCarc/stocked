const validateSchema = (schema) => async (req, res, next) => {
    try {
        // console.log(req)
        await schema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
        // console.log(error.inner[0].type)
        return res.status(400).json(error.inner.map(e => {
            console.log(e.path)
            return {
                "field": e.path,
                "message": e.errors[0]
            }
        }))
    }
}

module.exports = { validateSchema }