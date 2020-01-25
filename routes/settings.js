const express = require('express');
const router = express.Router();

var {
    scoreOfDisease,
    Disease
} = require('../models/diseases.js');

router.get('/app/systemsettings', (req, res) => {
    res.status(200).render('systemsettings', {
        pageTitle: "System settings"
    });
});

module.exports = router;