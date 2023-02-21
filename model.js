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
