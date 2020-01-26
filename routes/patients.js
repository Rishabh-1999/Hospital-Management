const express = require('express');
const _ = require('lodash');
const router = express.Router();

/* Models */
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
} = require('../models/rooms.js');
var isValidDate = require('is-valid-date');
const {
    ObjectID
} = require('mongodb');

router.get('/app/addpatient', (req, res) => {
    res.render('addpatient', {
        pageTitle: "Add patient"
    });
});

router.post('/app/addpatient', (req, res) => {
    var PD = req.body.PD;
    var dateOfBirth = req.body.dateOfBirth;

    if (_.isEmpty(PD)) {
        PD = [];
    }

    // Check for empty fields
    if (_.isEmpty(req.body.firstName) || _.isEmpty(req.body.lastName) || _.isEmpty(req.body.hospitalNumber) || !isValidDate(dateOfBirth)) {
        if (_.isEmpty(req.body.firstName)) req.flash('error_msg', 'Please enter the first name.');
        if (_.isEmpty(req.body.lastName)) req.flash('error_msg', 'Please enter the last name.');
        if (_.isEmpty(req.body.hospitalNumber)) req.flash('error_msg', 'Please enter the hospital number.');
        if (!isValidDate(dateOfBirth)) req.flash('error_msg', 'The date is not valid.');

        res.status(400).redirect('/app/addpatient');
    } else {
        // set the gender of the new patient
        var sex = req.body.sex;
        if (sex === "male") {
            sex = true;
        } else {
            sex = false;
        }

        // make a new patient and add it in the database
        var patient = Patient({
            firstName: _.capitalize(req.body.firstName),
            lastName: _.capitalize(req.body.lastName),
            sex: sex,
            dateOfBirth: dateOfBirth,
            hospitalNumber: _.toUpper(req.body.hospitalNumber),
            diseases: PD,
            lastUpdate: (new Date().getTime())
        });

        patient.save().then((patient) => {
            patient.updateScore();
            res.status(200).redirect('/dashboard');
        }).catch((err) => {
            console.log(err);
            res.status(400).redirect('/dashboard');
        });
    }
});

router.get('/app/getpatients', (req, res) => {
    Patient.find({}).then((patients) => {
        res.status(200).send(patients);
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

router.get('/app/patient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;
    Patient.findOne({
        hospitalNumber
    }).then((patient) => {
        if (_.isEmpty(patient)) {
            throw Error('Patient does not exist');
        }
        res.status(200).render('patientPage');
    }).catch((err) => {
        console.log(err);
        res.status(404).redirect('/dashboard');
    });
});

router.get('/app/getpatient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;
    Patient.findOne({
        hospitalNumber
    }).then((patient) => {
        res.status(200).send(patient);
    }).catch((err) => {
        req.flash('error_msg', 'Please enter the first name.');
        res.status(404).redirect('/dashboard');
    });
});

router.post('/app/updatepatient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;

    var PD = req.body.PD;
    if (_.isEmpty(PD)) {
        PD = [];
    }

    Patient.findOneAndUpdate({
        hospitalNumber
    }, {
        "$set": {
            "diseases": PD,
            "lastUpdate": (new Date().getTime())
        }
    }, {
        new: true
    }).then((patient) => {
        patient.updateScore();
        res.redirect('/app/patient/' + hospitalNumber);
    }).catch((err) => {
        console.log(err);
        res.redirect('/app/patient/' + hospitalNumber);
    });
});

router.get('/app/deletepatient/:hospitalNumber', (req, res) => {
    var hospitalNumber = req.params.hospitalNumber;

    Promise.all([Room.find({}), Patient.findOne({
            hospitalNumber: hospitalNumber
        })])
        .then((data) => {
            var rooms = data[0];
            var patient = data[1];

            // if the patient is in a room, make the room empty
            if (patient.room !== 'noroom') {
                for (var i = 0; i < rooms.length; ++i) {
                    if (rooms[i].name === patient.room) {
                        rooms[i].availability = false;
                        rooms[i].save();
                        break;
                    }
                }
            }

            patient.remove().then((patients) => {
                res.status(200).redirect('/dashboard');
            });
        }).catch((err) => {
            res.status(400).redirect('/dashboard');
        });
});

module.exports = router;