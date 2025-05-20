import request from "supertest";
import app from "../src/app";

describe("GET /not-found", () => {
  it("returns a status code 404", async () => {
    const response = await request(app).get("/not-found");
    expect(response.status).toEqual(404);
  });
});
