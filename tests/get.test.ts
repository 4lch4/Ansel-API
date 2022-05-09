/**
 * GET - /get/:folderName
 * GET - /get/:folderName/:assetId
 */
const baseUrl = 'http://localhost:8080/api/v1'

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

describe('Test /get/:folderName route', () => {
  test('Can get contents of a folder', async () => {
    const listRes = await axios.get(`${baseUrl}/list`)
    const folder = listRes.data.data[getRandomNumber(0, listRes.data.count - 1)]

    const folderRes = await axios.get(`${baseUrl}/get/${folder}`)

    if (folderRes.status === 200) {
      expect(folderRes.data.includes(folder)).toBe(true)
      expect(folderRes.data.startsWith("https://ansel.4lch4.tech")).toBe(true)
    }
  })
})

describe('Test /:folderName/:assetId route', () => {
  test('Can get a specific asset within a folder', async () => {
    const listRes = await axios.get(`${baseUrl}/list`)
    const folder = listRes.data.data[getRandomNumber(0, listRes.data.count - 1)]

    const folderRes = await axios.get(`${baseUrl}/get/${folder}/0`)

    if (folderRes.status === 200) {
      expect(folderRes.data.includes(folder)).toBe(true)
      expect(folderRes.data.startsWith("https://ansel.4lch4.tech")).toBe(true)
    }
  })
})
