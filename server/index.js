const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const path = require('path')

const PORT = 2567
const PRODUCTS_PATH = 'data/products'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const validResponse = ({ params }) => {
  if (!params || !params.version) {
    return false
  }

  if (params.version !== 'v2.0') {
    return false
  }

  return true
}

app.get('/products/:version/categories', (req, res) => {
  const { params } = req

  if (!validResponse(req)) {
    return res.sendStatus(422)
  }

  res.send(
    require(
      path.join(__dirname, `${PRODUCTS_PATH}/${params.version}/categories/categories.json`)
    )
  )
})

app.get('/products/:version/products', (req, res) => {
  const { params } = req

  if (!validResponse(req)) {
    return res.sendStatus(422)
  }

  res.send(
    require(
      path.join(__dirname, `${PRODUCTS_PATH}/${params.version}/products/products.json`)
    )
  )
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`)
})
