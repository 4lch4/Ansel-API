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
const getImageWithIndex = async (name, index) => {
  try {
    const files = await listDirectoryFiles(name)
    if (!index) index = chance.integer({ min: 0, max: files.length })

    for (let x = 0; x < files.length; x++) {
      const file = files[x]
      const key = file.Key

      if (key.substring(key.indexOf('/') + 1).toLowerCase().startsWith(`${name}-${index}`)) {
        const obj = await S3.getObject({
          Bucket: 'ansel',
          Key: key
        }).promise()

        return obj
      }
    }

    return undefined
  } catch (err) { return err }
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
