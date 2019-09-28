const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

fetch("https://raw.githubusercontent.com/Drulac/Verbes-Francais-Conjugues/master/verbes_lowercase.json")
.then ( resp => resp.json() )
.then ( verbs => {
    verbs_infinitif = verbs
        .map( v => {
            if (v.infinitif === undefined) {
                return undefined
            } else {
                return v.infinitif.présent[0]
            }
        })
        .filter( e => e !== undefined)

    console.log("Attempt writing to file")
    fs.writeFile(
        path.join(__dirname, "verbes_infinitif.json"), 
        JSON.stringify(verbs_infinitif),
        err => { 
            if (err) { console.log(err) }
            else { console.log("Success!") }
        }
    )
})
