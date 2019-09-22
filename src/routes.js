const Errors = require('restify-errors')
const { getImageWithIndex } = require('./utils')

module.exports = server => {
  server.get('/ansel', (req, res, next) => {
    console.log('Request received at /ansel endpoint.')
    res.send(200, 'You have found the beginning of the ansel endpoint. Good luck!')
    return next()
  })

  server.get('/ansel/reaction', (req, res, next) => {
    console.log('Request received at /ansel/reaction endpoint.')
    if (req.is('application/json') || req.is('application/octet-stream')) {
      // Use a ternary operator to determine if the data was provided as a URL
      // query. If so, set data equal to the content of req.query. Otherwise,
      // set it equal to req.body.
      const data = req.query.name ? req.query : req.body

      console.log('Request is of correct type.')
      console.log('Data...')
      console.log(data)

      // Verify there was data provided via a URL query or the request body.
      if (!data) {
        console.log('Data was not provided.')
        res.send(new Errors.BadRequestError('No data provided.'))
        return next()
      }

      getImageWithIndex(data.name, data.index).then(image => {
        console.log(`${data.name} retrieved with index ${data.index}`)
        res.send(200, image.Body)
        return next()
      }).catch(err => {
        console.error(err)
        res.send(500, err)
        return next(new Errors.InternalServerError(err))
      })
    } else {
      console.log(req)
      return next(new Errors.InvalidContentError("Only 'application/json', 'application/octet-stream', or 'application/xml' requests accepted."))
    }
  })

  server.get('/ansel/healthz', (req, res, next) => {
    res.send(200, 'OK')
    next()
  })
}
