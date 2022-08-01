const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

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
            return res.status(403).json("You cannot edit another user's post.");
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

//DELETE post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId)
        {
            await post.deleteOne();
            return res.status(200).json("Your post has deleted!");
        } else {
            return res.status(403).json("You cannot delete another user's post.");
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

//GET post
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//PUT like
router.put("/:id/like", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("The post has been liked.");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(403).json("You disliked this post.");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

//GET posts user's timeline
router.get("/timeline/:userId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        //Get friends posts
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router;