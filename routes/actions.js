import express from 'express';
const router = express.Router();

router.get('/current_actions', function(req, res) {
    
    res.end(JSON.stringify({value:"value"}));
});

router.get('/current_actions/highlighted', function(req, res) {
    res.end(JSON.stringify({value:"value"}));
});

router.get('/current_actions/', function(req, res) {
    res.end(JSON.stringify({value:"value"}));
});



export default router;
