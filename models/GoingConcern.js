const mongoose = require('mongoose');
mongoose.pluralize(null);
const  GoingConcernSchema =  new mongoose.Schema({
    company:{
        type: String,
        required: false
    },
    engagementYearEnd:{
        type: String,
        required: false
    },    
    wpRef:{
        type: String,
        required: false
    },
    doesMaterialityUncertaintyA:{
        type: String,
        required: false
    },
    commentA:{
        type: String,
        required: false
    },
    doesMaterialityUncertaintyB:{
        type: String,
        required: false
    },
    commentB:{
        type: String,
        required: false
    },
    
    doesMaterialityUncertaintyD:{
        type: String,
        required: false
    },
    commentD:{
        type: String,
        required: false
    },
    
    doesMaterialityUncertaintyE:{
        type: String,
        required: false
    },
    commentE:{
        type: String,
        required: false
    },
    
    doesMaterialityUncertaintyF:{
        type: String,
        required: false
    },
    commentF:{
        type: String,
        required: false
    }  

});

const GoingConcern = mongoose.model('going-concern', GoingConcernSchema);

module.exports = GoingConcern;