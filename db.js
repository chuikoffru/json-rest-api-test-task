const mysql = require('promise-mysql')

//База данных для локальной разработки и запуска тестов
//Допустимо только для приватных реп
if (process.env.NODE_ENV == 'development') {

  process.env = {
    DB_HOST: "remotemysql.com",
    DB_NAME: "grqAt1o6uw",
    DB_PASS: "",
    DB_USER: "grqAt1o6uw"
  }
}

module.exports = async(query) => {

  let connection

  try {

    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 3306
    })

    return await connection.query(query)

  } catch (error) {
    console.error('Connection error: ' + error.stack)
    throw error
  } finally {
    connection.end()
  }

}
