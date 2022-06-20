const router = require("express").Router();
const User = require("../models/User");

// CRUD
// Read user info
// Update user info
router.put("/:id", async(req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("User info has updated!");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You have to use own account.");
    }
});

// Delete user info
router.delete("/:id", async(req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User info has deleted.");
        } catch (err) {
            return res.status(500).json(err);
        }
    }  else {
            return res.status(403).json("You cannot delete.");
        }
});


/*
router.get("/", (req,res) => {
    res.send("user router");
});
*/
module.exports = router;