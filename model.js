const db = require("./db/connection");
exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

exports.fetchArticles = (article_id) => {
  if (!+article_id && article_id !== undefined)
    return Promise.reject("bad-request");
  let queryStr = `SELECT * FROM articles `;
  const paraArray = [];
  if (article_id) {
    queryStr += `WHERE article_id = $1`;
    paraArray.push(article_id);
  }
  return db.query(queryStr, paraArray).then((result) => {
    return result.rows;
  });
};

exports.fetchArticleByIdComment = (article_id) => {
  if (!+article_id && article_id !== undefined)
    return Promise.reject("bad-request");
  let queryStr = `SELECT c.comment_id, c.votes, c.created_at, c.author, c.body, c.article_id FROM articles AS a 
  LEFT JOIN comments AS c ON a.article_id = c.article_id WHERE a.article_id = $1 `;
  return db.query(queryStr, [article_id]).then((result) => {
    return result.rows;
  });
};

exports.insertCommentById = (article_id, objBody) => {
  const { username, body } = objBody;
  if (
    !username ||
    typeof username !== "string" ||
    !+article_id ||
    !body ||
    body === ""
  )
    return Promise.reject("bad-request");
  return db
    .query(
      `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;`,
      [body, username, article_id]
    )
    .then((result) => {
      return result.rows;
    });
};
