const Errors = require('restify-errors')
const aws = require('aws-sdk')
const SpacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com')
const S3 = new aws.S3({
  endpoint: SpacesEndpoint
})

const getImageWithIndex = (name, index) => {
  return new Promise(async (resolve, reject) => {
    const files = await listDirectoryFiles(name)

    for (let x = 0; x < files.length; x++) {
      const file = files[x]
      const key = file.Key
      if (key.substring(key.indexOf('/') + 1).toLowerCase().startsWith(`${name}-${index}`)) {
        // console.log(`Found!`)
        // console.log(file)
        S3.getObject({
          Bucket: 'ansel',
          Key: key
        }, (err, obj) => {
          if (err) reject(err)
          else resolve(obj)
        })
      }
    }
  })
}

const listDirectoryFiles = directoryName => {
  return new Promise((resolve, reject) => {
    S3.listObjectsV2({ Bucket: 'ansel', Prefix: `${directoryName}/` }, (err, data) => {
      if (err) reject(err)
      else resolve(data.Contents)
    })
  })
}

module.exports = server => {
  server.get('/ansel/reaction', async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new Errors.InvalidContentError("Expects 'application/json'"))
    } else {
      let data = {}
      if (req.body) {
        data = req.body
      } else if (req.query.name) {
        data = req.query
      }

      try {
        const image = await getImageWithIndex(data.name, data.index)
        res.send(200, image.Body)
        next()
      } catch (err) {
        console.error(err)
        res.send(500, err)
        next()
      }
    }
  })

  server.get('/ansel/healthz', (req, res, next) => {
    res.send(200, 'OK')
    next()
  })
}
