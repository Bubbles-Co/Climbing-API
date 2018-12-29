const express = require('express')
const folktale = require('folktale')

const app = express()
const port = '3000'

app.get('/', (req, res) => {
    res.send('Hello Flash!')
})

app.listen(port, _ => {
    console.log(`Climbing API is running on port ${port}`)
})