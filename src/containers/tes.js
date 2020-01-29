'use strict'

//const express = require('express');
//const app = express();
//app.use(express.json());

const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')
const querystring = require('querystring')

let app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.

const candidates = []

app.post('/candidates', function(req, res) {
  // ...
  if (req.body) {
    if (candidates.filter(candidate => candidate.id === req.body.id) === null) {
      candidates.push(req.body)
    } else {
      candidates[req.body.id] = req.body
    }
  }

  return res.status(200).send(req.body)
})

app.get('/candidates/search', function(req, res) {
  // ...
  let skills = []

  if (req.query.skills) {
    skills = req.query.skills.split(',')
  }

  if (candidates.length > 0) {
    let candidateRanking = []
    candidates.map(c => {
      let match = skills.filter(skill => c.skills.includes(skill))
      if (match && match.length > 0) candidateRanking.push(match.length)
    })

    if (candidateRanking.length > 0) {
      let skilledCandidateIndex = candidateRanking.indexOf(
        Math.max(...candidateRanking)
      )

      return res.status(200).send(candidates[skilledCandidateIndex])
    }
  }
  return res.status(404).send()
})

app.listen(process.env.HTTP_PORT || 3000)
