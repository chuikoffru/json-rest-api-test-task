const mysql = require('promise-mysql')

module.exports = async (query) => {

  let connection

  try {

    connection = await mysql.createConnection({
      host : "remotemysql.com",
      user : "grqAt1o6uw",
      password : "***REMOVED***",
      database : "grqAt1o6uw",
      port: 3306
    })

    return await connection.query(query)
    
  } catch (error) {

    console.error('Connection error: ' + error.stack)
    throw error

  } finally {

    console.log('Connection closed',)
    connection.end()

  }

}