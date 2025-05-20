import request from "supertest";
import app from "../src/app";
import errors from "../src/constants/error.constant";

describe("GET /api/example", () => {
  it("returns a status code 200", async () => {
    const response = await request(app).get("/api/example?id=1");

    expect(response.status).toEqual(200);

    expect(response.body).toStrictEqual({
      success: true,
      data: {
        id: 1,
      },
    });
  });

  it("returns a status code 400 with text id", async () => {
    const response = await request(app).get("/api/example?id=test");

    expect(response.status).toEqual(400);

    expect(response.body).toStrictEqual({
      success: false,
      error: errors.INVALID_DATA,
      details: [
        {
          field: "query.id",
          message: "Expected number, received nan",
        },
      ],
    });
  });

  it("returns a status code 400 with non-positive id", async () => {
    const response = await request(app).get("/api/example?id=-10");

    expect(response.status).toEqual(400);

    expect(response.body).toStrictEqual({
      success: false,
      error: errors.INVALID_DATA,
      details: [
        {
          field: "query.id",
          message: "Number must be greater than 0",
        },
      ],
    });
  });
});
