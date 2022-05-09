const baseUrl = 'http://localhost:8080/api/v1'

describe('Test /list route', () => {
  test('get returns an array', async () => {
    const { status, data } = await axios.get(`${baseUrl}/list`)

    expect(status).toBe(200)
    expect(data.data.length).toBe(data.count)
  })
})

describe('Test /list/:folderName route', () => {
  test('can get contents of all listed folders', async () => {
    const listRes = await axios.get(`${baseUrl}/list`)
    let successful = true
    let routeCount = 0

    if (listRes.status === 200) {
      for (const folder of listRes.data.data) {
        const { status, data } = await axios.get(`${baseUrl}/list/${folder}`)
        if (status !== 200) successful = false
        else routeCount++
      }

      expect(successful).toBe(true)
      expect(routeCount).toBe(listRes.data.count)
    }
  })
})
