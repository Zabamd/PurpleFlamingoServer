const express = require("express");

const router = express.Router();

router.post('/', (req, res) => {
    res.send(JSON.stringify({"I Guess it worked":"hopefully"}));
});

module.exports = router;
