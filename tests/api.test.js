
describe('API', () => {

  const res = {
    status : (code) => code,
    json : (msg) => msg
  }

  let req = {
    body : {
      text : "Новая задача",
      priority : "0"
    },
    params : {
      id : 0
    }
  }

  test('POST /tasks/add возвращает data.affectedRows = 1', async () => {

    const postEndpoint = require('../routes/tasks.post')

    const postResult = await postEndpoint(req, res)

    req.params.id = postResult.data.insertId

    expect(postResult.data.affectedRows).toBe(1)
    
  })

  test('GET /tasks возвращает добавленную задачу', async () => {

    const getEndpoint = require('../routes/tasks.get')

    const getResult = await getEndpoint({}, res)

    expect(getResult).toEqual({
      id : req.params.id,
      text : 'Новая задача',
      priority : 0
    })
    
  })

  test('DELETE /tasks/:id удаляет задачу по ID', async () => {

    const deleteEndpoint = require('../routes/tasks.delete')

    const deleteResult = await deleteEndpoint(req, res)

    expect(deleteResult.data.affectedRows).toBe(1)

  })

})