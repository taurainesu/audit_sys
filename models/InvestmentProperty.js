const mongoose = require('mongoose');
mongoose.pluralize(null);
const  InvestmentPropertySchema =  new mongoose.Schema({
    company:{
        type: String,
        required: false
    },
    engagementYearEnd:{
        type: String,
        required: false
    },
    preparedBy:{
        type: String,
        required: false
    },
    reviewedBy:{
        type: String,
        required: false
    },
    property12014Bal:{
        type: String,
        required: false
    },
    property12014WPRef:{
        type: String,
        required: false
    },
    property12013Bal:{
        type: String,
        required: false
    },
    property12013WPRef:{
        type: String,
        required: false
    },
    property1TracedToTitle:{
        type: String,
        required: false
    }

});

const InvestmentProperty = mongoose.model('investment-property', InvestmentPropertySchema);

module.exports = InvestmentProperty;