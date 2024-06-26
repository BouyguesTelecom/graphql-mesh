import { test, expect } from 'vitest'
import axios from 'axios'
import { url, headers } from '../config'

/* Get all products */
const getProductById = /* GraphQL */ `
  query getProduct {
    getProductById(id: 1) {
      name
      price
      supplierId
    }
  }
`

test('getProductById: Server timing plugin', async () => {
  const response = await axios.post(url, { query: getProductById }, { headers })

  expect(response.data.errors).toBeUndefined()
  const serverTiming = response.headers['server-timing']
  expect(serverTiming).contains('getProductById;desc="getProductById (Products)";dur')
})
