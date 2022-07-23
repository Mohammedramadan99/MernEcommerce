const User = require("../Model/userModel");
const Post = require("../Model/postModel");
const Comment = require("../Model/CommentModel");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../Utils/ApiFeatures.js");

const postController = {
  newPost: catchAsyncError(async (req, res) => {
    const newPost = new Post(req.body);

    try {
      await newPost.save();
      res.status(200).json("Post created!");
    } catch (error) {
      res.status(500).json(error);
    }
  }),
  getPosts: catchAsyncError(async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }),
  //CREATE POST
  createPost: catchAsyncError(async (req, res) => {
    try {
      let images = [];

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "social media",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLinks;
      const newPost = await Post.create(req.body);
      const savedPost = await newPost.save();

      const userId = req.body.userInfo._id;
      const user = await User.findById(userId);
      await user.updateOne({ $push: { posts: savedPost } }); // after update you need to return the new user to frontend
      const updatedUser = await User.find();

      res.status(200).json({
        success: true,
        post: savedPost,
        updatedUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }),

  //UPDATE POST
  updataPost: catchAsyncError(async (req, res) => {
    let existPost = await Post.findById(req.params.id);

    if (!existPost) {
      return next(new ErrorHander("Product not found", 404));
    }
    // Images Start Here
    let images = [];
    try {
      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < existPost.images.length; i++) {
          await cloudinary.v2.uploader.destroy(existPost.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "blog",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        req.body.images = imagesLinks;
      }

      // if (existPost.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      // } else {
      res.status(401).json({
        success: false,
        message: "You can update only your post!",
      });
      // }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }),

  //DELETE POST
  deletePost: catchAsyncError(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      // if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
      // } else {
      res.status(401).json("You can delete only your post!");
      // }
    } catch (err) {
      res.status(500).json(err);
    }
  }),

  // DELETE ALL POSTS
  deleteAllPosts: catchAsyncError(async (req, res) => {
    try {
      const posts = Post.find({});
      await posts.remove();

      res.status(200).json({
        success: true,
        message: "posts deleted Successfully",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }),
  //GET POST
  getPost: catchAsyncError(async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json({
        success: true,
        post,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }),
  //GET ALL POSTS
  getAllPosts: catchAsyncError(async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    const allPosts = await Post.find();
    try {
      // const apiFeature = new ApiFeatures(Post.find(), req.query)
      // .filter();
      // let posts = await apiFeature.query;
      let filteredposts;
      console.log(catName);
      console.log(filteredposts);
      if (catName) {
        filteredposts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        filteredposts = await Post.find();
      }
      res.status(200).json({
        success: true,
        filteredposts,
        allPosts,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }),
};
module.exports = postController;
