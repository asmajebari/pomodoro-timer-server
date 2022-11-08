const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task.model')
const { userOne, userTwo, taskOne, userOneId, setupDB } = require('./fixtures/db')

beforeEach(setupDB);

test('It should create task for user', async () => {
    const response = await request(app).post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Task1',
            estimated: 4
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('It should back all user tasks', async () => {
    const response = await request(app).get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('It should not delete another user\'s task', async () => {
    const response = await request(app).delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    expect(Task.findById(taskOne._id)).not.toBeNull();

})
