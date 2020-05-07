const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

app.get('/pageview', function (req, res) {
   console.log('viewed!')
})

const server = app.listen(PORT, function () {
   var host = server.address().address
   console.log("Example app listening at http://%s:%s", host, PORT)
})