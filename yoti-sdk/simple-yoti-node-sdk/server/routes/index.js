const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Success dawg!'})
})

export default router