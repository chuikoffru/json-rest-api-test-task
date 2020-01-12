const express = require('express')
const bodyParser = require('body-parser')
const query = require('./db')

const app = express()

// Настраиваем body-parser

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json({
  extended: true
}))


// Получаем самую важную задачу, 0 - важно, 100 - не важно
app.get('/tasks', require('./routes/tasks.get'))


//Добавляем новую задачу
app.post('/tasks', require('./routes/tasks.post'))


//Удаляем задачу по её ID
app.delete('/tasks/:id', require('./routes/tasks.delete'))


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