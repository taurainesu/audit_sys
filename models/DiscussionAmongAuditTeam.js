const mongoose = require('mongoose');
mongoose.pluralize(null);
const  DiscussionAmongAuditTeamSchema =  new mongoose.Schema({
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

    meetingDate:{
        type:String,
        required: false
    },

    updateOnAuditProgress:{
        type: String,
        required: false
    },
    independence:{
        type: String,
        required: false
    },
    reviewOfWork:{
        type: String,
        required: false
    },
    fraud:{
        type: String,
        required: false
    },
    
    
    
    sampleSelection:{
        type: String,
        required: false
    },
    anyOtherIssues:{
        type: String,
        required: false
    }  

});

const DiscussionAmongAuditTeam = mongoose.model('discussion-among-audit-team', DiscussionAmongAuditTeamSchema);

module.exports = DiscussionAmongAuditTeam;