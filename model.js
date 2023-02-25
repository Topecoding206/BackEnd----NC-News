const db = require("./db/connection");
exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

exports.fetchArticles = (
  article_id,
  topic,
  sort_by,
  order = "DESC",
  queriesBody
) => {
  const orderCapitalLetter = order.toUpperCase();
  const validateSortBy = [
    "article_id",
    "topic",
    "author",
    "title",
    "created_at",
    "votes",
  ];

  const validateOrder = ["ASC", "DESC"];
  let queryStr = `SELECT * FROM articles `;
  const paraArray = [];
  const checkPropertyKey = Object.keys(queriesBody);
  if (
    (!+article_id && article_id !== undefined) ||
    (!validateSortBy.includes(sort_by) && sort_by) ||
    !validateOrder.includes(orderCapitalLetter) ||
    (!article_id &&
      !topic &&
      !sort_by &&
      order === "DESC" &&
      checkPropertyKey.length > 0)
  )
    return Promise.reject("bad-request");
  if (!article_id && !topic && !sort_by) {
    queryStr += `ORDER BY created_at ${orderCapitalLetter}`;
  }
  if (article_id) {
    queryStr += `WHERE article_id = $1 ORDER BY created_at ${orderCapitalLetter} `;
    paraArray.push(article_id);
  }

  if (topic && order) {
    queryStr += `WHERE topic = $1 ORDER BY created_at ${orderCapitalLetter}`;
    paraArray.push(topic);
  }
  if (sort_by && order) {
    queryStr += ` ORDER BY ${sort_by} ${orderCapitalLetter}`;
  }
  return db.query(queryStr, paraArray).then((result) => {
    return result.rows;
  });
};

exports.checkTopic = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1`, [topic])
    .then((result) => {
      return result.rows;
    });
};
exports.addComments = (article_id) => {
  return db
    .query(
      `SELECT COUNT(c.comment_id) FROM articles AS a 
      LEFT JOIN comments AS c ON a.article_id = c.article_id WHERE a.article_id = $1 ;`,
      [article_id]
    )
    .then((result) => {
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

exports.updateArticleById = (body, article_id) => {
  const { inc_votes } = body;
  if (!+article_id && article_id !== undefined)
    return Promise.reject("not valid");
  if (
    (Object.keys(body).length < 1 && !inc_votes) ||
    !Object.keys(body).includes("inc_votes") ||
    typeof inc_votes !== "number"
  )
    return Promise.reject("bad-request");
  return db
    .query(
      `UPDATE articles SET votes = $1 + votes WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then((result) => {
      return result.rows;
    });
};

exports.fetchUser = () => {
  return db.query(`SELECT * FROM users`).then((result) => {
    return result.rows;
  });
};

exports.removeCommentById = (comment_id) => {
  if (!+comment_id && comment_id !== undefined)
    return Promise.reject("bad-request");
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
      comment_id,
    ])
    .then((result) => {
      return result.rows;
    });
};

exports.fetchUserById = (username) => {
  if (+username) return Promise.reject("bad-request");
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [username])
    .then((result) => {
      return result.rows;
    });
};

exports.updateComment = (comment_id, body) => {
  const { inc_votes } = body;
  if (!+comment_id && comment_id !== undefined)
    return Promise.reject("not valid");
  if (
    (Object.keys(body).length < 1 && !inc_votes) ||
    !Object.keys(body).includes("inc_votes") ||
    typeof inc_votes !== "number"
  )
    return Promise.reject("bad-request");
  return db
    .query(
      `UPDATE comments SET votes = $2 + votes WHERE comment_id = $1 RETURNING *;`,
      [comment_id, inc_votes]
    )
    .then((result) => {
      return result.rows;
    });
};
