const mongoose = require('mongoose');
mongoose.pluralize(null);
const  UploadSupportingDocSchema =  new mongoose.Schema({
    company:{
        type: String,
        required: false
    },
    engagementYearEnd:{
        type: String,
        required: false
    },
    workPapers:{
        type:String,
        required: false
    },    
    additionalComments:{
        type: String,
        required: false
    }  

});

const UploadSupportingDoc = mongoose.model('upload-supporting-doc', UploadSupportingDocSchema);

module.exports = UploadSupportingDoc;