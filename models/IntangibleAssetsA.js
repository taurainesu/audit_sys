const mongoose = require('mongoose');
mongoose.pluralize(null);
const  IntangibleAssetsASchema =  new mongoose.Schema({
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
    wpRef:{
        type: String,
        required: false
    },
    overallMaterialityAmount:{
        type: String,
        required: false
    },
    overallMaterialityWPRef:{
        type: String,
        required: false
    },
    significantRiskPerfMaterialityAmount:{
        type: String,
        required: false
    },
    significantRiskPerfMaterialityWPRef:{
        type: String,
        required: false
    },
    nonSignificantRiskPerfMaterialityAmount:{
        type: String,
        required: false
    },
    nonSignificantRiskPerfMaterialityWPRef:{
        type: String,
        required: false
    },
    clearlyTrivialAmount:{
        type: String,
        required: false
    },
    clearlyTrivialWPRef:{
        type: String,
        required: false
    },
    intangibleAssetsPerAFS2018:{
        type: String,
        required: false
    },
    intangibleAssetsPerAFSWPRef:{
        type: String,
        required: false
    },
    intangibleAssetsPerAFS2017:{
        type: String,
        required: false
    }

});

const IntangibleAssetsA = mongoose.model('intangible-assets-a', IntangibleAssetsASchema);

module.exports = IntangibleAssetsA;