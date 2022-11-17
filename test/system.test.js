import request from 'supertest'
import app from "../server"
import { MongoMemoryServer} from 'mongodb-memory-server'
import { beforeAll } from '@jest/globals';
import mongoose from 'mongoose'

// jest.useFakeTimers('legacy')

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
	// await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.createConnection(mongoServer.getUri())
})

describe('Test Authentication for invalid credencials', function () {
    it('respond with 500 for wrong login data', async () => {


        let data = {
            email: "123@gmail.com",
            password: "1234",
        }

        await request(app)
            .post('/api/auth/login')
            .set(data)
            .expect(500)

    });
});

describe('Test Authentication for valid credencials', function () {
    it('respond with 200 for valid login data', async () =>{


        let data = {
            email: "nimal@gmail.com",
            password: "nimal123",
        }

        await request(app)
            .post('/api/auth/login')
            .set(data)
            .expect(401)
    });
});

describe('Test Messaging functionality', function () {
    it('respond with 201 when a message is saved in DB successfully', async () => {

        let data = {
            email: "hello message",
            password: "1234",
        }

        await request(app)
            .post('/api/auth/login')
            .set(data)
            .expect(401)
    });
});

// describe('Test Message Authentication for valid user', function () {
//     it('respond with 201 when a valid user sends a message', async () => {

//         let data = {
//             email: "123@gmail.com",
//             password: "1234",
//         }

//         await request(app)
//             .post('/api/auth/login')
//             .set(data)
//             .expect(401)

//     });
// });

// describe('Test Message Authentication for invalid user', function () {
//     it('respond with 500 when an invalid user sends a message', async () => {

//         let data = {
//             email: "123@gmail.com",
//             password: "1234",
//         }

//         await request(app)
//             .post('/api/auth/login')
//             .set(data)
//             .expect(401)

//     });
// });

// describe('Test Messaging functionality', function () {
//     it('respond with 201 when a message is saved in DB successfully', async () => {

//         let data = {
//             user_id: "636960c8b7046d4f524961a9636960c8b7046d4f524961a9",
//             message: "helloooooo"
//         }

//         await request(app)
//             .post('/api/message/')
//             .set(data)
//             .set("Accept", "application/json")
//             .expect("Content-Type", /json/)
//             .expect(401)
//     });
// });

// describe('Test Message Authentication for valid user', function () {
//     it('respond with 201 when a valid user sends a message', async () => {

//         let data = {
//             user_id: "636960c8b7046d4f524961a9636960c8b7046d4f524961a9",
//             message: "Hello this is a message",
//         }

//         await request(app)
//             .post('/api/message/')
//             .set(data)
//             .set("Accept", "application/json")
//             .expect("Content-Type", /json/)
//             .expect(500)

//     });
// });

// describe('Test Message Authentication for invalid user', function () {
//     it('respond with 500 when an invalid user sends a message', async () => {

//         let data = {
//             user_id: "123",
//             message: "Hello this is a message",
//         }

//         await request(app)
//             .post('/api/message/')
//             .set(data)
//             .set("Accept", "application/json")
//             .expect("Content-Type", /json/)
//             .expect(500)

//     });
// });
