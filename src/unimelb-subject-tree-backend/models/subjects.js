var mongoose = require("mongoose");

var subjectSchema = new mongoose.Schema({
       code: {
         type: String,
         required: true
       },
       name: {
              type: String,
              required: true
       },
       array: {
              type: Array,
              required: false
       }
});

module.exports = mongoose.model('subject', subjectSchema, "subject");