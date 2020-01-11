const express = require('express')
const query = require('./db')

const app = express()

app.get('/', async (req, res) => {

  try {

    const tasks = await query("SELECT * FROM tasks")

    res.json(tasks)

  } catch (error) {
    res.status(500).json(error)
  }

  
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

//Run app, then load http://localhost:3000 in a browser to see the output.