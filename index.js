var kappa = require('kappa-core')
var hypercore = require('hypercore')

var core = kappa('./log', { valueEncoding: 'json' })

var culture = {
  'genus': 'Ganoderma',
  'species': 'lucidum',
  'strain': 'Aleon1',
  'code': 'GLAL001'
}

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
      msg.value
    })
    next()
  },
}

core.use('culture', cultureView)

core.feed('cultures', function (err, feed) {
  feed.append(culture, function (err) {
    core.api.culture.get(function (err, value) {
      console.log(value) //1
    })
  })
})
