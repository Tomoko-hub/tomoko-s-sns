const router = require("express").Router();
const Post = require("../models/Post");

// CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//UPDATE post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId)
        {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("Post success!");
        } else {
            return res.status(403).json("You cannot edit onother user's post.");
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

module.exports = router;