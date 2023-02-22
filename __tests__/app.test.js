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
        expect(body.article).toHaveLength(1);
        expect(body.article[0].article_id).toBe(1);
        expect(body.article[0].title).toBe(
          "Living in the shadow of a great man"
        );
        expect(body.article[0].topic).toBe("mitch");
        expect(body.article[0].author).toBe("butter_bridge");
        expect(body.article[0].body).toBe("I find this existence challenging");
        expect(body.article[0].created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(body.article[0].votes).toBe(100);
        expect(body.article[0].article_img_url).toBe(
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

describe("GET  /api/articles/:article_id/comments", () => {
  test("200: should return array of object comments", () => {
    return request(app)
      .get("/api/articles/1/comment")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(11);
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("article_id", 1);
        });
      });
  });

  test("404: should return not found when not valid number passed", () => {
    return request(app)
      .get("/api/articles/13/comment")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: should return bad request when not non number passed", () => {
    return request(app)
      .get("/api/articles/nonsense/comment")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: should return array of object inserted", () => {
    return request(app)
      .post("/api/articles/1/comment")
      .send({
        username: "butter_bridge",
        body: "Just posting new comment",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toHaveLength(1);
        expect(body.comment[0].body).toBe("Just posting new comment");
        expect(body.comment[0].article_id).toBe(1);
        expect(body.comment[0].author).toBe("butter_bridge");
      });
  });
  test("400:when incorrect username passed it should return bad-request", () => {
    return request(app)
      .post("/api/articles/2/comment")
      .send({ username: 45, body: "incomplete comment" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("404 if no article found with requested id", () => {
    return request(app)
      .post("/api/articles/100000/comment")
      .send({ username: "butter_bridge", body: "Just posting new comment" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("article not found");
      });
  });
  test("400 for invalid non numeric id", () => {
    return request(app)
      .post("/api/articles/banana/comment")
      .send({ username: "butter_bridge", body: "THIS IS A NEW COMMENT" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400 when body is empty", () => {
    return request(app)
      .post("/api/articles/1/comment")
      .send({ username: "butter_bridge", body: "" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400 when body is not assigned", () => {
    return request(app)
      .post("/api/articles/1/comment")
      .send({ username: "butter_bridge" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400 when username is not assigned", () => {
    return request(app)
      .post("/api/articles/1/comment")
      .send({ body: "THIS IS A NEW COMMENT" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: should return the article when zero vote pass", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 0 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toHaveLength(1);
        expect(body.article[0].article_id).toBe(1);
        expect(body.article[0].title).toBe(
          "Living in the shadow of a great man"
        );
        expect(body.article[0].topic).toBe("mitch");
        expect(body.article[0].author).toBe("butter_bridge");
        expect(body.article[0].body).toBe("I find this existence challenging");
        expect(body.article[0].created_at).toBe("2020-07-09T20:11:00.000Z");
        expect(body.article[0].votes).toBe(100);
        expect(body.article[0].article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("200: should return updated article with vote increase", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: 20 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article[0].votes).toBe(20);
      });
  });
  test("200: should return updated article with vote decrease", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -50 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article[0].votes).toBe(50);
      });
  });
  test("400: should return bad request when non inc_votes passed", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: "apple" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("404: should return not found for non existent article", () => {
    return request(app)
      .patch("/api/articles/5000")
      .send({ inc_votes: 20 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
  test("400: should return bad request when body doesnt have inc_votes property", () => {
    return request(app)
      .patch("/api/articles/10")
      .send({ banana: 20 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("400: should not for invalid non numeric id", () => {
    return request(app)
      .patch("/api/articles/banana")
      .send({ inc_votes: 10 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Valid Id");
      });
  });
});
