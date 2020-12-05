const mongoose = require('mongoose');
const PreEngagement = require('./PreEngagement').schema;
const GoingConcern = require('./GoingConcern').schema;
mongoose.pluralize(null);
const  DocumentSchema =  new mongoose.Schema({
    year:{
        type: String,
        required: false
    },
    preengagement:[],
    planning:[],
    field_work:[],    
});

const CompanyDocument = mongoose.model('company', DocumentSchema);

module.exports = CompanyDocument;