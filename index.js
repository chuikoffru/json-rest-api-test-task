const express = require('express')
const bodyParser = require('body-parser')
const query = require('./db')

const app = express()

// Настраиваем body-parser

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json({extended: true}))

// Получаем самую важную задачу, 100 - важно, 0 - не важно

app.get('/tasks', async(req, res) => {

  try {

    const tasks = await query("SELECT * FROM tasks ORDER BY priority DESC")

    return res.json(tasks)

  } catch (error) {
    return res
      .status(500)
      .json(error)
  }

})

//Добавляем новую задачу

app.post('/tasks', async(req, res) => {

  const fields = req.body

  //Проверяем все ли данные получены
  if (!fields.text || !fields.priority) {

    return res
      .status(422)
      .json({status: "Вы не заполнили обязательные поля"})

  }

  try {

    const sql = `INSERT INTO tasks(text,priority) VALUES(?,?)`;
    const values = [fields.text, fields.priority]
    const data = await query({sql, values})

    if(data) {
      return res.json(data)
    }

  } catch (error) {
    
    return res
      .status(500)
      .json({status: "Ошибка записи данных в базу", error})
  }

})


//Удаляем задачу по её ID, возвращаем status : true в случае успеха

app.delete('/tasks/:id', async(req, res) => {

  //const taskId = req.params.id

})

//Слушаем указанный порт

app.listen(3000, async() => {

  try {

    //Если таблицы задач не существует в базе данных - создаем новую

    const tasksTableExist = await query(`SHOW TABLES FROM grqAt1o6uw LIKE "tasks"`)

    if (tasksTableExist.length === 0) {
      await query(`CREATE TABLE IF NOT EXISTS tasks (
        id INT NOT NULL AUTO_INCREMENT , 
        text VARCHAR(255) NOT NULL , 
        priority TINYINT(100) NOT NULL , 
        PRIMARY KEY (id)) ENGINE = InnoDB;`)
    }

  } catch (error) {}

  console.log('Example app listening on port 3000!')

})