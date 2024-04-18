const express = require('express');
const router = express.Router();
const codecreate = require('../Controller/temp_code');

router.post('/createcode', codecreate.temcodegen);

module.exports = router;
