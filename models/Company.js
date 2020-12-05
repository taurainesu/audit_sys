const mongoose = require('mongoose');
mongoose.pluralize(null);
const Document = require('./CompanyDocument').schema;
const  CompanySchema =  new mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    documents:[
       {type: Document}
    ],    
});

const Company = mongoose.model('companies', CompanySchema);

module.exports = Company;