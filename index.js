#!/usr/bin/env node

var inquirer = require('inquirer')

var kappa = require('kappa-core')
var hypercore = require('hypercore')

var core = kappa('./log', { valueEncoding: 'json' })

var questions = [
  {
    type: 'input',
    name: 'code',
    message: 'Unique ID'
  },
  {
    type: 'input',
    name: 'genus',
    message: 'Genus'
  },{
    type: 'input',
    name: 'species',
    message: 'Species'
  },{
    type: 'input',
    name: 'strain',
    message: 'Strain'
  }
]

console.log('            ')
console.log('[ MYKAFILE ]')
console.log('            ')
console.log('Add a Culture:')
console.log('            ')

inquirer.prompt(questions).then(answers => {
  
  var culture = (JSON.stringify(answers, null, ' '));

  var cultureView = {
    api: {
      get: function (core, cb) {
        this.ready(function () {
          cb(null, culture)
        })
      }
    },
    map: function (msgs, next) {
      msgs.forEach(function (msg) {
	console.log(msg.value);
      })
      next()
    },
  }
  
  core.use('culture', cultureView)
  
  core.feed('cultures', function (err, feed) {
    feed.append(culture, function (err) {
      core.api.culture.get(function (err, value) {
        return //1
      })
    })
  });
})
