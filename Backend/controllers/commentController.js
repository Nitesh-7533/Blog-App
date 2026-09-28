const Comment = require("../models/Comment");
const BlogPost = require("../models/BlogPost");

// @routes  POST /api/comments/:postid
const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;

    //Ensure blog post exists
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      content,
      parentComment: parentComment || null,
    });

    await comment.populate("author", "name profileImageUrl");
    res.status(201).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add Comment", error: error.message });
  }
};

//@routes GET /api/comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl") // Note: Schema me check karein coverImageUrl ka 'U' capital hai ya small
      .sort({ createdAt: 1 });

    const commentMap = {};
    const formattedComments = [];

    // 1. Plain objects me convert karein aur replies array initialize karein
    comments.forEach((c) => {
      const commentObj = c.toObject(); // Sahi spelling: toObject()
      commentObj.replies = [];
      commentMap[commentObj._id] = commentObj; // Value assign karein
      formattedComments.push(commentObj);
    });

    // 2. Nest replies under their parentComment
    const nestedComments = [];
    formattedComments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(comment);
        } else {
          nestedComments.push(comment);
        }
      } else {
        // Agar parentComment null ya undefined hai to yeh main root comment hai
        nestedComments.push(comment);
      }
    });
    res.json(nestedComments);
    // 3. Response send karein
    return res.status(200).json(nestedComments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch all Comment", error: error.message });
  }
};

//@routes  GET /api/comments/:postId
const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name profileImageUrl")
      .populate("post", "title coverImageUrl")
      .sort({ createdAt: 1 });

    const commentMap = {};
    const formattedComments = [];

    // 1. Plain JS object me convert karein aur Map me store karein
    comments.forEach((c) => {
      const commentObj = c.toObject();
      commentObj.replies = [];
      commentMap[commentObj._id.toString()] = commentObj;
      formattedComments.push(commentObj);
    });

    // 2. Replies aur Root comments ko alag karein
    const nestedComments = [];
    formattedComments.forEach((comment) => {
      if (comment.parentComment) {
        const parentId = comment.parentComment.toString();
        const parent = commentMap[parentId];

        if (parent) {
          parent.replies.push(comment);
        } else {
          // Agar parent comment delete ho chuka ho
          nestedComments.push(comment);
        }
      } else {
        // Yeh root / top-level comment hai
        nestedComments.push(comment);
      }
    });

    return res.status(200).json(nestedComments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch Comment", error: error.message });
  }
};

//@routes  DELETE /api/comments/:commentsId
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Delete the comment
    await Comment.deleteOne({ _id: commentId });

    // Delete all replies to this comment (one level of nesting only)
    await Comment.deleteMany({ parentComment: commentId });

    res.json({ message: "Comment and any replies deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Comment", error: error.message });
  }
};

module.exports = {
  addComment,
  getAllComments,
  getCommentsByPost,
  deleteComment,
};
