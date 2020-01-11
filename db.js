const mysql = require('promise-mysql')

const db = async (query) => {

  try {

    const connection = await mysql.createConnection({
      host : "remotemysql.com",
      user : "grqAt1o6uw",
      password : "***REMOVED***",
      database : "grqAt1o6uw",
      port: 3306
    })

    return await connection.query(query)
    
  } catch (error) {
    console.error('error connecting: ' + error.stack)
    throw error
  }

}


module.exports = db