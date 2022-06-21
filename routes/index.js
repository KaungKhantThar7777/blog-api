const express = require("express");
const api = require("./api");

const router = express.Router();

router.get("/posts", async (req, res) => {
  const data = await api.getPosts(req.query);

  res.json(data);
});

router.get("/posts/:urlTitle", async (req, res) => {
  const data = await api.getPost(req.params.urlTitle);

  res.json(data);
});
module.exports = router;
