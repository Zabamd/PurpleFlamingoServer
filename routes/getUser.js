import express from 'express';
const router = express.Router();

router.get('/', function(req, res) {
  res.end(JSON.stringify({value:"value"}));
});

export default router;
