const router = require('express').Router()
const Student = require('../models/Student')

router.get('/', (req, res) => {
    Student.findAll()
    .then(students => res.render('index', { students }))
    .catch(err => console.log(err))
})

module.exports = router