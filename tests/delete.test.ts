/**
 * DELETE - /delete/:folderName
 * DELETE - /delete/:folderName/:assetId
 */
const baseUrl = 'http://localhost:8080/api/v1'

describe('Test /delete/:folderName/:assetId route', () => {
  test('Can delete a specific asset within a folder', async () => {
    const delRes = await axios.delete(`${baseUrl}/delete/test/0`)
    console.log(delRes)

    expect(delRes.status).toBe(200)
  })
})

describe('Test /delete/:folderName route', () => {
  test('Can delete an entire asset folder', async () => {
    const delRes = await axios.delete(`${baseUrl}/delete/test`)

    console.log(delRes)

    expect(delRes.status).toBe(200)
  })
})
