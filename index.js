const express = require('express')
const bodyParser = require('body-parser')
const query = require('./db')

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json({
  extended : true
})) 

// Получаем самую важную задачу, 100 - важно, 0 - не важно
app.get('/', async (req, res) => {

  try {

    const tasks = await query("SELECT * FROM tasks ORDER BY priority DESC")

    return res.json(tasks)

  } catch (error) {
    return res.status(500).json(error)
  }
  
})

app.post('/add', async (req, res) => {

  const fields = req.body

  console.log('fields', fields)

  //INSERT INTO `tasks` (`id`, `text`, `priority`) VALUES (NULL, 'Реализовать добавление новой задачи', '99')

   res.json(fields)

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