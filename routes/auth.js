const router = require("express").Router();
const User = require("../models/User");

//user registration
router.post("/register", async (req, res) => {
    try{
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// log in
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send("User not found.");

        const vaildPassword =req.body.password === user.password;
        if (!vaildPassword) return res.status(400).json("Oops! Incorrect password!");
        
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});

/*
router.get("/", (req,res) => {
    res.send("auth router");
});
*/

module.exports = router;