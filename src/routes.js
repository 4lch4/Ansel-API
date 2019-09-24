const Errors = require('restify-errors')
const { getImageWithIndex } = require('./utils')

module.exports = server => {
  server.get('/ansel', (req, res, next) => {
    res.send(200, 'You have found the beginning of the ansel endpoint. Good luck!')
    return next()
  })

  server.get('/ansel/reaction', (req, res, next) => {
    if (req.is('application/json') || req.is('application/octet-stream')) {
      // Use a ternary operator to determine if the data was provided as a URL
      // query. If so, set data equal to the content of req.query. Otherwise,
      // set it equal to req.body.
      const data = req.query.name ? req.query : req.body
      const returnUrl = req.query.return_url ? req.query.return_url : false

      // Verify there was data provided via a URL query or the request body.
      if (!data) {
        res.send(new Errors.BadRequestError('No data provided.'))
        return next()
      }

      getImageWithIndex(data.name, data.index).then(image => {
        console.log(image)
        if (image) {
          if (returnUrl) {
            res.send(200, image.url)
          } else {
            res.send(200, image.obj.Body)
          }
        } else res.send(200, 'No image was found with the given index 😢')

        return next()
      }).catch(err => {
        res.send(500, err)
        return next(new Errors.InternalServerError(err))
      })
    } else {
      return next(new Errors.InvalidContentError("Only 'application/json', 'application/octet-stream', or 'application/xml' requests accepted."))
    }
  })

  server.get('/ansel/healthz', (req, res, next) => {
    res.send(200, 'OK')
    next()
  })
}
