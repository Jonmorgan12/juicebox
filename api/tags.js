const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName, getAllTags, getAllPosts } = require('../db');
// const { requireUser } = require('./utils');

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const { tagName } = req.params;
  const getPostTag = await getPostsByTagName(tagName)

  try {
    getPostTag.filter(post => {
      if  (post.active === false && post.authorId !== req.user.id) {
        return false;
      }
    })

    res.send({ posts: getPostTag })

  } catch ({ name, message }) {
    next({name, message})

  }
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
    res.send({
      tags
    });
  });

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

// Come back to this function

module.exports = tagsRouter;

// localhost:3000/api/tags/%23happy/posts -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJwYXNzd29yZCI6ImJlcnRpZTk5IiwibmFtZSI6Ik5ld25hbWUgU29nb29kIiwibG9jYXRpb24iOiJMZXN0ZXJ2aWxsZSwgS1kiLCJhY3RpdmUiOnRydWUsImlhdCI6MTYwMTI0MTAwN30.b99hetgzYiIjwy1Qvrgy8PCfoBPZYHoPe7OXyJERm7Y'