const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create a post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const post = new Post({ ...req.body, author: req.user.userId });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Read all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update a post
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).send('Unauthorized');
    }
    Object.assign(post, req.body);
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete a post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).send('Unauthorized');
    }
    await post.remove();
    res.send('Post deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
