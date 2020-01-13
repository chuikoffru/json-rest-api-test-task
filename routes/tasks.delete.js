const query = require('../db')

module.exports = async(req, res) => {

  const taskId = parseInt(req.params.id)

  if (taskId) {

    try {

      const data = await query(`DELETE FROM tasks WHERE id = ${taskId}`)

      if(data.affectedRows > 0) {

        return res.json({
          message : `Удалена ${data.affectedRows} задача с ID: ${taskId}`,
          data
        })

      } else {

        return res.json({
          message : `Задача с ID ${taskId} не была удалена. Возможно ее просто нет в БД`
        })

      }
      

    } catch (error) {

      return res
        .status(500)
        .json({message : "Произошла ошибка при удалении из БД"}, error)

    }

  } else {

    return res
      .status(442)
      .json({message: "Указан неверный ID"})

  }

}