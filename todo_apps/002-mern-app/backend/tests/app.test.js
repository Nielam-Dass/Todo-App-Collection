const app = require("../src/app");
const request = require("supertest");


test("Get 200 OK status at root page", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
});

test("Get 404 error when sending GET request to task route", async () => {
    const response = await request(app).get("/task");
    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body).toEqual({ message: "404 Not Found" });  // toEqual() checks for deep equality of objects, unlike toBe()
});
