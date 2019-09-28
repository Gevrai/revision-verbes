var express = require('express')
var path = require('path')
var fs = require('fs')

var app = express()

function random(min, max) {
    return Math.floor(Math.random()*(max-min-1)) + min
}

let data = fs.readFileSync(path.join(__dirname, "verbs", "verbes_lowercase.json"))
let verbs = JSON.parse(data)

// Randomizer
app.get('/random', (req, res) => {
    let verb = verbs[random(0, verbs.length)]

    let temps, conj

    switch (random(0,4)) {
        case 0:
            temps = "Présent"
            conj = verb.indicatif.présent
            break;
        case 1:
            temps = "Imparfait"
            conj = verb.indicatif.imparfait
            break;
        case 2:
            temps = "Conditionnel présent"
            conj = verb.conditionnel.présent
            break;
        case 3:
            temps = "Passé simple"
            conj = verb.indicatif["passé simple"]
            break;
        case 4:
            temps = "Futur simple"
            conj = verb.indicatif["futur simple"]
            break;
    }

    var pers = random(0,5)
    pers_str = ["je", "tu", "il", "nous", "vous", "ils"][pers]

    let json_resp = {
        "temps" : temps,
        "pers": `P${pers + 1}`,
        "inf": verb.infinitif.présent[0],
        "conj": `${pers_str} ${conj[pers]}`
    }

    res.json(json_resp)
})

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')))


var PORT = process.env.PORT || 8000
var server = app.listen(8000)