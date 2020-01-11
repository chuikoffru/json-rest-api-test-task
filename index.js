const express = require('express')
const query = require('./db')

const app = express()

// Получаем самую важную задачу, 100 - важно, 0 - не важно
app.get('/', async (req, res) => {

  try {

    const tasks = await query("SELECT * FROM tasks ORDER BY priority DESC LIMIT 1")

    if(tasks.length > 0) {

      return res.json(tasks[0])

    } else {

      return res.json({"status" : "Нет записей"})

    }

  } catch (error) {
    return res.status(500).json(error)
  }
  
})

app.post('/add', async (req, res) => {

  //const fields = req.body

})

app.delete('/:id', async (req, res) => {

  //const taskId = req.params.id

})

app.listen(3000, async () => {

  try {

    //Если таблицы задач не существует в базе данных - создаем новую

    const tasksTableExist = await query(`SHOW TABLES FROM grqAt1o6uw LIKE "tasks"`)

    if(tasksTableExist.length === 0) {
      await query(`CREATE TABLE IF NOT EXISTS tasks (
        id INT NOT NULL AUTO_INCREMENT , 
        text VARCHAR(255) NOT NULL , 
        priority TINYINT(100) NOT NULL , 
        PRIMARY KEY (id)) ENGINE = InnoDB;`)
    }

  } catch (error) {
    
  }

  console.log('Example app listening on port 3000!')

})