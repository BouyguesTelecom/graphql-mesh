import { test, expect } from 'vitest'
import axios from 'axios'
import { url, headers } from '../config'

/* Get all products */
const getProductById = /* GraphQL */ `
  query getProduct {
    getProductById(id: 1) {
      name @lower
      price
      supplierId
    }
  }
`

test('getProductById:  @lower directive added throw transform', async () => {
  const response = await axios.post(url, { query: getProductById }, { headers })

  const result = response.data
  expect(result.errors).toBeUndefined()
  expect(result).toHaveProperty('data')
  expect(result.data.getProductById.name).toEqual('product 1')
})
