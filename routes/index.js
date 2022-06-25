const express = require("express");
const { isAdmin } = require("../middlewares/isAdmin");
const api = require("./api");

const router = express.Router();

router.get("/posts", async (req, res) => {
  await api.getPosts(req, res);
});

router.get("/posts/:urlTitle", async (req, res) => {
  const data = await api.getPost(req.params.urlTitle);

  res.json(data);
});

router.post("/users", async (req, res) => {
  const data = await api.createUser(req, res);
  res.json(data);
});

router.post("/login", async (req, res) => {
  await api.login(req, res);
});
router.post("/logout", async (req, res) => {
  res.clearCookie("isAdmin");
  res.status(204).end();
});

router.post("/posts", isAdmin, async (req, res) => {
  await api.createPost(req, res);
});

module.exports = router;
