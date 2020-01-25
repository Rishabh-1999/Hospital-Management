var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/nhs-app");

module.exports = {
    mongoose
};