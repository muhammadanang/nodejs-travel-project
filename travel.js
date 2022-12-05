const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000
app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankyou)

app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).send({ error: err.message })
        handlers.vacationPhotoContestProcess(req, res, fields, files)
    })
})
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)

app.use(handlers.notFound)

app.use(handlers.serverError)

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express berjalan pada http://localhost:${port}` + `; tekan Ctrl-C untuk terminate.`)
    })
} else {
    module.exports = app
}