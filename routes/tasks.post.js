const query = require('../db')

module.exports = async(req, res) => {

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

}