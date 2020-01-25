const express = require('express');
const router = express.Router();

var {
    scoreOfDisease,
    Disease
} = require('../models/diseases.js');
var {
    Patient
} = require('../models/patient.js');
var {
    rooms,
    Room
} = require('../models/rooms');


router.get('/dashboard', (req, res) => {
    res.status(200).render('dashboard');
});

module.exports = router;