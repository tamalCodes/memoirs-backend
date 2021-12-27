//* This is the controller file
//* All the actual backend work such as creating, deleting a note and so on will be done here

import { request } from "express";
import Post from "../models/Post_schema.js";
const url = "http://localhost:5000";
import grid from "gridfs-stream";
import mongoose from "mongoose";

//* Here with the help of gridfs-stream we are getting the original Image from the Mongo DB
//* In mongo DB there is a collection named fs
let gridFSBucket;
let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//^ CREATE CONTROLLER
//^ Here we are getting the details from the body and then we are simply saving all these into the DB
//^ After that we are sending sucess which will be used in the frontend

export const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();

    res.json({ sucess: true });
  } catch (error) {
    console.log(error);
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//^ UPLOAD IMAGE CONTROLLER
//^ Here we are getting the image from the body and then we are using another file Utils -> Upload.js
//^ After that we are sending sucess and imageUrl which will be used in the frontend

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.json({ sucess: false });

    const imageUrl = `${url}/file/${req.file.filename}`;

    res.json({ sucess: true, imageUrl });
  } catch (error) {
    console.log(error);
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//^ GET IMAGE CONTROLLER
//^ After the image is uploaded to the DB we need to get  sucess and that Image's URL so we need
//^ another package which will help us decode the image and give us the URL
//^ We use this controller to get the image's URL and also we use grid-fs
//^ This is called in UPLOAD IMAGE CONTROLLER : `${url}/file/${req.file.filename}`

export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({
      filename: req.params.filename,
    });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
    // res.json({ sucess: true, imageUrl });
  } catch (error) {
    console.log(error);
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//^ GET ALL POSTS CONTROLLER
//^ Here this is used to get all posts from the DB , and store it in a constant
//^ After that the posts are returned in form of JSON

export const getAllPosts = async (req, res) => {
  let username = req.query.username;
  let category = req.query.category;
  let posts;
  try {
    if (username) {
      posts = await Post.find({ username: username });
    } else if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//^ GET A SINGLE POST CONTROLLER
//^ Here this is used to fetch a single post from the DB with the help of it's ID
//^ We get the ID from the params and use that

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//^ EDIT A  POST CONTROLLER
//^ Here this is used to fetch a single post from the DB with the help of it's ID
//^ Then edit that note with the help of the newly added/edited Data
//^ If edited then sucess = true

export const editPost = async (req, res) => {
  const { title, description, picture, username, categories, date } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (picture) {
      newNote.picture = picture;
    }
    if (username) {
      newNote.username = username;
    }
    if (categories) {
      newNote.categories = categories;
    }
    if (date) {
      newNote.date = date;
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ sucess: true, post });
  } catch (error) {
    console.log(error);
  }
};

//^ `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
//^ DELETE A SINGLE POST CONTROLLER
//^ Here this is used to fetch a single post from the DB with the help of it's ID
//^ We get the ID from the params and use that to delete the post

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.json({ sucess: true });
  } catch (error) {
    console.log(error);
  }
};
