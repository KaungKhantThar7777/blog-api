const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    urlTitle: {
      type: String,
      unique: true,
    },
    dateTimestamp: Number,
    tags: Array,
    thumbnailImageUrl: String,
    markdownContent: String,
    seoTitleTag: String,
    seoMetaDescription: String,
  },
  {
    collection: "posts",
  }
);

BlogPostSchema.index({
  urlTitle: 1,
});

module.exports = mongoose.model("Post", BlogPostSchema);
