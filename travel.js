const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

const fortunes = [
    "Ada sama dimakan, tak ada sama ditahan",
    "Bersatu kita teguh, bercerai kita runtuh",
    "Cepat kaki ringan tangan",
    "Dimana bumi dipijak, disana langit dijunjung",
    "Fajar menyingsing elang menyongsong",
    "Jauh berjalan banyak dilihat",
    "Jauh di mata, dekat di hati"
]

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', { fortune: randomFortune })
})

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express mulai di https://localhost:${port}; press Ctrl-C to terminate.`
))