const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user.model')
const { userOne, userOneId, setupDB } = require('./fixtures/db')

beforeEach(setupDB);

test('It should register a new user', async() => {
    const response = await request(app).post('/users/register')
        .send({
            username: 'Asma',
            email: 'asma@example.com',
            password: 'AsmaTest555?'
        }).expect(201);
    
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            username: 'Asma',
            email: 'asma@example.com',
        },
        token: user.tokens[0].token
    });
});

test('It should login user', async() => {
    const response = await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200);
    
        const user = await User.findById(response.body.user._id);
    
        expect(response.body.token).toBe(user.tokens[1].token);
    
});

test('It should not login non existant user', async() => {
    await request(app).post('/users/login')
        .send({
        email: 'none@example.com',
        password:'NoneExample'
    }).expect(400)
});

test('It should get profile for user', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('It should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

test('It should delete account for user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
        const user = await User.findById(userOneId);
        expect(user).toBeNull();
});

test('It should not delete account for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

test('It should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            username: 'Asma_'
        })
        .expect(200);
    const user = await User.findById(userOneId)
    expect(user.username).toEqual('Asma_')
})


test('It should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            age: 23
        })
        .expect(400);
})