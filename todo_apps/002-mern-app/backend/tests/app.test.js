const app = require("../src/app");
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");


let mongoServer = null;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const dbUri = mongoServer.getUri();
    mongoose.connect(dbUri)
});

afterAll(async () => {
    if(mongoServer) {
        await mongoServer.stop();
    }
    await mongoose.connection.close();
});

test("Get 200 OK status and empty list at root page", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual([]);
});

test("Get 404 error when sending GET request to task route", async () => {
    const response = await request(app).get("/task");
    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "404 Not Found" });  // toEqual() checks for deep equality of objects, unlike toBe()
});
