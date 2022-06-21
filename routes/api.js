const moment = require("moment");
const showdown = require("showdown");

const BlogPostModel = require("../models/post");

const getPosts = async (query) => {
  const { tag, limit } = query;

  const now = moment().unix();

  const res = await BlogPostModel.find(
    {
      ...(tag && { tags: tag }),
      dateTimestamp: {
        $lte: now,
      },
    },
    "title urlTitle dateTimestamp tags thumbnailImageUrl"
  )
    .sort({
      dateTimestamp: -1,
    })
    .limit(limit);
  return res;
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

module.exports = {
  getPosts,
  getPost,
};
