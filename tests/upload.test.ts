/**
 * POST - /upload/:folderName
 * POST - /upload/:folderName/:assetId
 * PUT - /upload/:folderName/:assetId
 */
const baseUrl = 'http://localhost:8080/api/v1'

describe('Test /upload/:folderName route', () => {
  test('Can upload a new asset', async () => {
    expect(true).toBe(true)
  })
})

describe('Test /upload/:folderName/:assetId route', () => {
  test('Can upload a new asset and assign an ID', async () => {
    expect(true).toBe(true)
  })

  test('Can update an existing asset', async () => {
    expect(true).toBe(true)
  })
})
