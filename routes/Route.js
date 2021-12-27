//* This is the Route file where all the routes such as create, delete  will be called
//* On calling the routes as soon as the routes matches a specific controller will be fired
//* All the works such as creating, updating etc will be done in the Post-controller file

import express from "express";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getSinglePost,
  uploadImage,
  getImage,
} from "../controller/Post-controller.js";
import Upload from "../utils/Upload.js";

const router = express.Router();

//^ HOME ROUTER
router.get("/", (req, res) => {
  res.send("HELLO FROM HOME");
});

//^ Router to create a post
router.post("/create", createPost);

//^ Router to upload the image
//^ "Upload" is a middleware which recieves the "file" we sent from createview
router.post("/uploadfile", Upload.single("file"), uploadImage);

//^ Router to get the image which we have uploaded
router.get("/file/:filename", getImage);

//^ Router to get all posts
router.get("/getallposts", getAllPosts);

//^ Router to get a Particular post
router.get("/post/:id", getSinglePost);

//^ Router to edit a Particular post
router.post("/edit/:id", editPost);

//^ Router to delete a particular post
router.delete("/delete/:id", deletePost);

//! EXPORTING ROUTES
export default router;
