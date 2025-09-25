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

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for(const key in collections){
        await collections[key].deleteMany();
    }
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

test("Successfully add task by sending POST request to task route", async () => {
    const newTask = {
        taskName: "My new task",
        taskDescription: "My new task description"
    };

    let response = await request(app).get("/");
    expect(response.body).toHaveLength(0);
    
    response = await request(app).post("/task").send(newTask);
    expect(response.status).toBe(201);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "New task created" });
    
    response = await request(app).get("/");
    expect(response.body).toHaveLength(1);
    expect(response.body).toEqual([expect.objectContaining(newTask)]);
});

test("Fail to add task when sending POST request to task route with missing fields", async () => {
    const newTask = {
        taskName: "My new task",
        // Missing taskDescription
    };

    let response = await request(app).get("/");
    expect(response.body).toHaveLength(0);
    
    response = await request(app).post("/task").send(newTask);
    expect(response.status).toBe(400);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "Must provide task name and description" });
    
    response = await request(app).get("/");
    expect(response.body).toHaveLength(0);
});
