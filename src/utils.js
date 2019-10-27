const Chance = require('chance')
const chance = new Chance()

const AWS = require('aws-sdk')
const S3 = new AWS.S3({ endpoint: new AWS.Endpoint('nyc3.digitaloceanspaces.com') })

/**
 * Retrieves an image from the Ansel DO Spaces with the provided name and index,
 * if one is provided. If there is no index then a random image is returned.
 *
 * @param {String} name The name of the reaction you wish to find an image/gif for.
 * @param {number} [index] The number of the specific reaction image/gif you wish to retrieve.
 */
const getImageWithIndex = (name, index) => {
  let found = false

  return new Promise((resolve, reject) => {
    listDirectoryFiles(name).then(files => {
      if (!index) index = chance.integer({ min: 0, max: files.length - 1 })
      else if (index > files.length) resolve(undefined)

      for (let x = 1; x < files.length; x++) {
        const file = files[x]
        const key = file.Key
        const compA = key.substring(key.indexOf('/') + 1).toLowerCase()
        const compB = `${name}-${index}`

        if (compA.startsWith(compB)) {
          found = true
          S3.getObject({
            Bucket: 'ansel',
            Key: key
          }, (err, obj) => {
            if (err) reject(err)
            else {
              resolve({
                obj: obj,
                url: `https://nyc3.digitaloceanspaces.com/ansel/${key}`
              })
            }
          })
        }
      }

      if (!found) {
        resolve(undefined)
      }
    })
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

module.exports.getImageWithIndex = getImageWithIndex
