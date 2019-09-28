const express = require('express')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')

var app = express()

const verbe_cc_url = "http://verbe.cc/vcfr"

function fetchVerb(verb, mood, tense, pers, callback, err) {
    let uri = `${verbe_cc_url}/conjugate/fr/${verb}?mood=${mood}&tense=${tense}`

    fetch(encodeURI(uri))
    .then( resp => {
        return resp.json()
    })
    .then( json => {
        let verb = json.value[pers]
        callback(verb)
    })
    .catch( error => err(error) )
    
}

function randomInt(min, max) {
    return Math.floor(Math.random()*(max-min)) + min
}

let data = fs.readFileSync(path.join(__dirname, "verbs", "verbes_infinitif.json"))
let verbs = JSON.parse(data)

// Format: (ui_string, api_mood, api_tense)
const tenses = [
    ["Indicatif présent",         "indicatif", "présent"],
    ["Indicatif imparfait",       "indicatif", "imparfait"],
    ["Indicatif futur simple",    "indicatif", "futur-simple"],
    ["Indicatif passé simple",    "indicatif", "passé-simple"],
    ["Indicatif passé composé",   "indicatif", "passé-composé"],
    ["Indicatif plus-que-parfait","indicatif", "plus-que-parfait"],
    ["Indicatif futur antérieur", "indicatif", "futur-antérieur"],
    ["Indicatif passé antérieur", "indicatif", "passé-antérieur"],

    ["Conditionnel présent", "conditionnel", "présent"],
    ["Conditionnel passé", "conditionnel", "passé"],

    ["Subjonctif présent", "subjonctif", "présent"],
    ["Subjonctif imparfait", "subjonctif", "imparfait"],
    ["Subjonctif passé", "subjonctif", "passé"],
    ["Subjonctif plus-que-parfait", "subjonctif", "plus-que-parfait"]
]

// Randomizer
app.get('/api/random', (req, res) => {
    let verb = verbs[randomInt(0, verbs.length)]
    let tense = tenses[randomInt(0, tenses.length)]

    var pers = randomInt(0,6)

    fetchVerb(verb, tense[1], tense[2], pers,
        conj => {
            res.json({
                "temps" : tense[0],
                "pers": `P${pers + 1}`,
                "inf": verb,
                "conj": conj 
            })
        }, 
        err => {
            res.json({
                "temps" : tense[0],
                "pers": `P${pers + 1}`,
                "inf": verb,
                "conj": "API error:\n" + err 
            })
        })
})

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')))

var PORT = process.env.PORT || 8000
var server = app.listen(PORT, () => {
    console.log("Server started listening on port " + PORT)
})