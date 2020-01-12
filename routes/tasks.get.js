const query = require('../db')

module.exports = async(req, res) => {

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

}