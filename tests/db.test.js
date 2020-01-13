const query = require('../db')

const testTable = "tests"

describe("MySQL", () => {

  test("Проверка корректного соединения", async() => {

    const check = await query("SELECT 1")

    expect(check[0]).toEqual({"1": 1})

  })

  test("Создание тестовой таблицы", async() => {

    const data = await query(`CREATE TABLE IF NOT EXISTS ${testTable} (
        id INT NOT NULL AUTO_INCREMENT , 
        text VARCHAR(255) NOT NULL , 
        priority TINYINT(100) NOT NULL , 
        PRIMARY KEY (id)) ENGINE = InnoDB;`)

    expect(data.serverStatus).toBe(2)

  })

  test("Проверка наличия тестовой таблицы", async() => {

    const testTableExist = await query(`SHOW TABLES FROM grqAt1o6uw LIKE "${testTable}"`)
    expect(testTableExist.length).toBe(1)

  })

})