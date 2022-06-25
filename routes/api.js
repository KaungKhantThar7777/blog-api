const moment = require("moment");
const showdown = require("showdown");
const argon2 = require("argon2");

const UserModel = require("../models/user");
const BlogPostModel = require("../models/post");

const createPost = async (req, res) => {
  try {
    const post = new BlogPostModel(req.body);

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: "Something was wrong!" });
  }
};

const getPosts = async (req, res) => {
  const { tag, limit } = req.query;

  const now = moment().unix();

  const data = await BlogPostModel.find(
    {
      ...(tag && { tags: tag }),
      ...(!req.cookies.isAdmin && {
        dateTimestamp: {
          $lte: now,
        },
      }),
    },
    "title urlTitle dateTimestamp tags thumbnailImageUrl"
  )
    .sort({
      dateTimestamp: -1,
    })
    .limit(limit);
  res.json(data);
};

const getPost = async (urlTitle) => {
  const res = await BlogPostModel.findOne({
    urlTitle,
  });

  if (!res) {
    return;
  }
  const markdownConverter = new showdown.Converter();
  res.markdownContent = markdownConverter.makeHtml(res.markdownContent);
  return res;
};

const createUser = async (req, res) => {
  const user = new UserModel(req.body);
  res.cookie("isAdmin", true, {
    // httpOnly: true,
    // secure: true,
  });
  await user.save();
  res.json({ success: true });
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }
    res.cookie("isAdmin", true, {
      httpOnly: true,
      secure: true,
    });
    res.json({ success: true });
  } catch (error) {
    res.clearCookie("isAdmin");
    res.status(401).json({ message: error.message });
  }
};
module.exports = {
  getPosts,
  getPost,
  createUser,
  login,
  createPost,
};
