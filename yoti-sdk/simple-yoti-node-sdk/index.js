import https from 'https'
import fs from 'fs'
import path from 'path'

import express from 'express'
const app     = express()

const cert    = fs.readFileSync(config.cert)
const key     = fs.readFileSync(config.key)

import './config'
import routes from './server/routes'

const options = { key, cert }

app.use(express.static('./public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/*', routes)

https.createServer(options, app).listen(config.port, () => {
    console.log(`Server is listening on ${config.port}`)
})

export default app