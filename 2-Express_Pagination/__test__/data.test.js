const request = require("supertest");
const app = require("../src/api"); // adjust path if needed

describe("GET /items Pagination", () => {
  it("should return default page and limit when no query params provided", async () => {
    const res = await request(app).get("/items");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      page: 1,
      limit: 5,
      items: [1, 2, 3, 4, 5],
    });
  });

  it("should return correct page and limit when query params provided", async () => {
    const res = await request(app).get("/items?page=2&limit=3");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      page: 2,
      limit: 3,
      items: [1, 2, 3],
    });
  });

  it("should fallback to defaults if invalid query params are given", async () => {
    const res = await request(app).get("/items?page=abc&limit=-5");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      page: 1,
      limit: 5,
      items: [1, 2, 3, 4, 5],
    });
  });
});
