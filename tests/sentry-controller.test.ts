import request from "supertest";
import app from "../src/app";

describe("GET /debug-sentry", () => {
  it("returns a status code 500", async () => {
    const response = await request(app).get("/debug-sentry");
    expect(response.status).toEqual(500);
  });
});
