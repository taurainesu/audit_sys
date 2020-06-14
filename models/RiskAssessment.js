const mongoose = require('mongoose');
mongoose.pluralize(null);
const  RiskAssessmentSchema =  new mongoose.Schema({
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
    fraudCorruptionRiskCategory:{
        type: String,
        required: false
    },
    fraudCorruptionRiskProcedures:{
        type: String,
        required: false
    },
    fraudCorruptionRiskSignificant:{
        type: String,
        required: false
    },
    fraudCorruptionRiskExplanation:{
        type: String,
        required: false
    },
    fraudCorruptionRiskWPReference:{
        type: String,
        required: false
    }

});

const RiskAssessment = mongoose.model('risk-assessment-a', RiskAssessmentSchema);

module.exports = RiskAssessment;