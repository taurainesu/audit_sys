const mongoose = require('mongoose');
mongoose.pluralize(null);


const  PreEngagementSchema =  new mongoose.Schema({
    company:{
        type: String,
        required: false
    },
    engagementYearEnd:{
        type: String,
        required: false
    },
    date:{
        type: String,
        required: false
    },
    wpRef:{
        type: String,
        required: false
    },
    commWithPrevAuditors:{
        type: String,
        required: false
    },
    communicateCommentsA:{
        type: String,
        required: false
    },
    ascertainIfAdvisedAccountant:{
        type: String,
        required: false
    },
    ascertainCommentsB:{
        type: String,
        required: false
    },
    didWeRequestPerm:{
        type: String,
        required: false
    },
    satisfiedCommentsC:{
        type: String,
        required: false
    },
    didWeDecline:{
        type: String,
        required: false
    },
    permissionCommentsD:{
        type: String,
        required: false
    },
    didWeAsk:{
        type: String,
        required: false
    },
    accountantCommentsE:{
        type: String,
        required: false
    },
    didWeAttemptToCommWithExistingAcc:{
        type: String,
        required: false
    },
    replyCommentsF:{
        type: String,
        required: false
    },
    discWithThirdParties:{
        type: String,
        required: false
    },
    discussionsCommentsG:{
        type: String,
        required: false
    },
    inquiriesOfOtherFirmPersonnel:{
        type: String,
        required: false
    },
    inquiriesCommentsH:{
        type: String,
        required: false
    },
    inquiriesOfThirdParties:{
        type: String,
        required: false
    },
    thirdCommentsI:{
        type: String,
        required: false
    },
    performBackgroundSearches:{
        type: String,
        required: false
    },
    backgroundCommentsJ:{
        type: String,
        required: false
    },
    honestRelationship:{
        type: String,
        required: false
    },
    honestCommentsK:{
        type: String,
        required: false
    },
    highRiskClient:{
        type: String,
        required: false
    },
    managedCommentsL:{
        type: String,
        required: false
    },
    changesInManagement:{
        type: String,
        required: false
    },
    changesCommentsM:{
        type: String,
        required: false
    },
    solvencyLevels:{
        type: String,
        required: false
    },
    solvencyCommentsN:{
        type: String,
        required: false
    },
    dominantIndividual:{
        type: String,
        required: false
    },
    dominantCommentsO:{
        type: String,
        required: false
    },
    historyOfLawsuits:{
        type: String,
        required: false
    },
    lawsuitsCommentsP:{
        type: String,
        required: false
    },
    otherOffices:{
        type: String,
        required: false
    },
    otherEngagementsCommentsQ:{
        type: String,
        required: false
    },
    identityKnown:{
        type: String,
        required: false
    },
    identityCommentsR:{
        type: String,
        required: false
    },
    businessReputation:{
        type: String,
        required: false
    },
    reputationCommentsS:{
        type: String,
        required: false
    },
    familiarWithOps:{
        type: String,
        required: false
    },
    familiarCommentsT:{
        type: String,
        required: false
    },
    informationConcerningAttitude:{
        type: String,
        required: false
    },
    attitudeCommentsU:{
        type: String,
        required: false
    },
    concernedWithMaintainingFees:{
        type: String,
        required: false
    },
    aggresivelyCommentsV:{
        type: String,
        required: false
    },
    inappropriateLimitation:{
        type: String,
        required: false
    },
    limitationCommentsW:{
        type: String,
        required: false
    },
    involvedInMoneyLaundering:{
        type: String,
        required: false
    },
    launderingCommentsX:{
        type: String,
        required: false
    },
    activitiesOfNOCLAR:{
        type: String,
        required: false
    },
    noclarCommentsY:{
        type: String,
        required: false
    },
    reasonsForAppointment:{
        type: String,
        required: false
    },
    appointmentCommentsZ:{
        type: String,
        required: false
    },
    knowledgeOfIndustry:{
        type: String,
        required: false
    },
    industryCommentsAA:{
        type: String,
        required: false
    },
    experienceWithRequirements:{
        type: String,
        required: false
    },
    experienceCommentsAB:{
        type: String,
        required: false
    },
    sufficientPersonnel:{
        type: String,
        required: false
    },
    personnelCommentsAC:{
        type: String,
        required: false
    },
    expertsAvailable:{
        type: String,
        required: false
    },
    expertsCommentsAD:{
        type: String,
        required: false
    },
    eqcrAvailable:{
        type: String,
        required: false
    },
    eqcrCommentsAE:{
        type: String,
        required: false
    },
    ableToComplete:{
        type: String,
        required: false
    },
    deadlineCommentsAF:{
        type: String,
        required: false
    },
    specialisedIndustryFactors:{
        type: String,
        required: false
    },
    factorsCommentsAG:{
        type: String,
        required: false
    },
    significantBranches:{
        type: String,
        required: false
    },
    branchesCommentsAH:{
        type: String,
        required: false
    },
    deadlineCoincideWithPressures:{
        type: String,
        required: false
    },
    pressuresCommentsAI:{
        type: String,
        required: false
    },
    independenceThreats:{
        type: String,
        required: false
    },
    independenceCommentsAJ:{
        type: String,
        required: false
    },
    scoreCount:{
        type: Number,
        required: false
    },
    aboveThreshold:{
        type: Boolean,
        required: false
    },
    auditAuthorised:{
        type: Boolean,
        required: false
    }

});

const PreEngagement = mongoose.model('test-pre-engagement', PreEngagementSchema);

module.exports = PreEngagement;