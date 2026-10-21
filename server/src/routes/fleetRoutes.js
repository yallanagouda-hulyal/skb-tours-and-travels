const express = require('express');
const router = express.Router();
const { getFleet } = require('../controllers/fleetController');

router.get('/', getFleet);

module.exports = router;
