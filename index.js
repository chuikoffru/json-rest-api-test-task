const express = require('express')
const bodyParser = require('body-parser')
const query = require('./db')

const app = express()


// Настраиваем body-parser

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json({extended: true}))


// Получаем самую важную задачу, 0 - важно, 100 - не важно

app.get('/tasks', async(req, res) => {

  try {

    const tasks = await query(`SELECT * FROM tasks ORDER BY priority ASC LIMIT 1`)

    if(tasks.length > 0) {

      return res.json(tasks[0])

    } else {

      return res.json({
        message: "Задач нет"
      })

    }

  } catch (error) {

    return res
      .status(500)
      .json(error)

  }

})


//Добавляем новую задачу

app.post('/tasks', async(req, res) => {

  let fields = req.body

  //Проверяем все ли данные получены
  if (!fields.text || !fields.priority) {

    return res
      .status(422)
      .json({message: "Вы не заполнили обязательные поля"})

  }

  fields.text = fields.text.trim()
  fields.priority = parseInt(fields.priority)

  //Проверяем наличие символов в поле text
  if(fields.text.length == 0) {

    return res
      .status(422)
      .json({message: "Поле текст должно содержать символы"})

  }

  //Проверяем корректный ввод числа приоритета
  if(fields.priority < 0 || fields.priority > 100) {

    return res
      .status(422)
      .json({message: "Приоритет может быть от 0 до 100"})

  }

  try {

    //Создаем новую запись в БД
    const sql = `INSERT INTO tasks(text,priority) VALUES(?,?)`
    const values = [fields.text, fields.priority]
    const data = await query({sql, values})

    return res.json({
      message : `Добавлена ${data.affectedRows} запись c ID: ${data.insertId}`
    })

  } catch (error) {

    return res
      .status(500)
      .json({message: "Ошибка записи данных в базу", error})
  }

})


//Удаляем задачу по её ID

app.delete('/tasks/:id', async(req, res) => {

  const taskId = parseInt(req.params.id)

  try {

    if (taskId) {

      const data = await query(`DELETE FROM tasks WHERE id = ${taskId}`)
      return res.json(data)

    } else {

      return res.status(442).json({
        message : "Указан неверный ID"
      })

    }

  } catch (error) {
    return res.status(500).json(error)
  }

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