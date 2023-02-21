const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const request = require("supertest");
beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("200: should return an array of topic object", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });

  test("404: should return not found when passed with string not valid", () => {
    return request(app)
      .get("/api/topti")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid-path");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: should return an array of articles object", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
        expect(body.articles).toHaveLength(12);
        body.articles.forEach((articles) => {
          expect(articles).toHaveProperty("title", expect.any(String));
          expect(articles).toHaveProperty("author", expect.any(String));
          expect(articles).toHaveProperty("body", expect.any(String));
          expect(articles).toHaveProperty("created_at", expect.any(String));
          expect(articles).toHaveProperty("votes", expect.any(Number));
          expect(articles).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );
        });
      });
  });

  test("404: should return not found when passed with string not valid", () => {
    return request(app)
      .get("/api/nonsense")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid-path");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: should return array of object with specific article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(1);
        expect(body.articles[0].article_id).toBe(1);
        expect(body.articles[0].title).toBe(
          "Living in the shadow of a great man"
        );
        expect(body.articles[0].topic).toBe("mitch");
        expect(body.articles[0].author).toBe("butter_bridge");
        expect(body.articles[0].body).toBe("I find this existence challenging");
        expect(body.articles[0].created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(body.articles[0].votes).toBe(100);
        expect(body.articles[0].article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("404: should return not found when not valid number passed", () => {
    return request(app)
      .get("/api/articles/15")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: should return bad request when not non number passed", () => {
    return request(app)
      .get("/api/articles/talk")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});
