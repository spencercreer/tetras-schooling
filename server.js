const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()

const sequelize = require('./config/config')
const Student = require('./models/Student')

sequelize.authenticate()
    .then(() => console.log('coding_quiz_db connected...'))
    .catch(err => console.log('db.authenticate error: ' + err))

const app = express();
const PORT = 3001

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    Student.findAll()
    .then(students => res.render('index', { students }))
    .catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`))