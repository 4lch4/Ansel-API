const Chance = require('chance')
const chance = new Chance()

const AWS = require('aws-sdk')
const endpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com')
console.log('endpoint...')
console.log(endpoint)
const S3 = new AWS.S3({ endpoint: endpoint })

/**
 * Retrieves an image from the Ansel DO Spaces with the provided name and index,
 * if one is provided. If there is no index then a random image is returned.
 *
 * @param {String} name The name of the reaction you wish to find an image/gif for.
 * @param {number} [index] The number of the specific reaction image/gif you wish to retrieve.
 */
const getImageWithIndex = (name, index) => {
  return new Promise((resolve, reject) => {
    listDirectoryFiles(name).then(files => {
      console.log(`Files have been retrieved... ${files.length}`)
      if (!index) index = chance.integer({ min: 0, max: files.length })

      for (let x = 0; x < files.length; x++) {
        const file = files[x]
        const key = file.Key

        if (key.substring(key.indexOf('/') + 1).toLowerCase().startsWith(`${name}-${index}`)) {
          console.log(`File found... x = ${x};`)
          console.log(file)
          S3.getObject({
            Bucket: 'ansel',
            Key: key
          }, (err, obj) => {
            console.log('Object retrieved from api...')
            if (err) {
              console.log('Error received...')
              console.log(err)
              reject(err)
            } else {
              console.log('Resolving object')
              console.log(resolve(obj))
            }
          })
        }
      }
    })
  })
}

const listDirectoryFiles = directoryName => {
  return new Promise((resolve, reject) => {
    console.log(`Attempting to list files in ${directoryName}...`)
    S3.listObjects({ Bucket: 'ansel', Prefix: `${directoryName}/` }, (err, data) => {
      if (err) reject(err)
      else resolve(data.Contents)
    })
    // S3.listObjectsV2({ Bucket: 'ansel', Prefix: `${directoryName}/` }, (err, data) => {
    //   if (err) reject(err)
    //   else resolve(data.Contents)
    // })
  })
}

module.exports.getImageWithIndex = getImageWithIndex
