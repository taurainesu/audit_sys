const mongoose = require('mongoose');
mongoose.pluralize(null);
const  CreateReviewNoteSchema =  new mongoose.Schema({
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
    reviewNoteTitle:{
        type: String,
        required: false
    },
    reviewNoteDescription:{
        type: String,
        required: false
    },
    wpToAttachTo:{
        type: String,
        required: false
    },
    priority:{
        type: String,
        required: false
    },      
    assignTo:{
        type: String,
        required: false
    }

});

const CreateReviewNote = mongoose.model('review-notes', CreateReviewNoteSchema);

module.exports = CreateReviewNote;