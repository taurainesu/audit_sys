var express = require('express');
var router = express.Router();
var assert = require('assert');
const { body, check, validationResult } = require('express-validator');
const User = require('../models/User');
const PreEngagement =  require('../models/PreEngagement');
const Investment = require('../models/InvestmentProperty');
const Risk = require('../models/RiskAssessment');
const GoingConcern = require('../models/GoingConcern');
const DiscussionAmongAuditTeam = require('../models/DiscussionAmongAuditTeam');
const IntangibleAssetsA = require('../models/IntangibleAssetsA');
const UploadSupportingDoc = require('../models/UploadSupportingDoc');
const CreateReviewNote = require('../models/CreateReviewNote');


var sessionChecker = (req, res, next) => {
	if (req.session.user && req.cookies.user_sid) {
		res.redirect('/');
	} else {
		next();
	}
};
let sess;

router.get('/login', function(req, res){
	console.log(req.flash());
	res.render('login', { message: req.flash() });
});

router.route('/login')
	.get(sessionChecker, (req, res) => {
		res.render('login', { message: req.flash() });
	})
	.post([
		body('username')
			.trim()
			.escape(),
		body('password')
			.trim()
			.escape()
	],(req, res) => {
		var username = req.body.username,
			password = req.body.password;

		//Find User
		User.findOne({username: username }).then(function(user) {
			if (!user) {
				req.flash('error', 'The username and password do not match.');
				res.redirect('/login');
			}

			//Match password
			if(password == user.password){
				req.session.user = user;
				sess = req.session.user;
				res.redirect('/main');

			}else {
				req.flash('error', 'The username and password do not match.');
				res.redirect('/login');
			}

		});

	});

router.get('/', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		res.render('main', {data:sess, user: sess.name});
	} else {
		res.redirect('/login');
	}
});


router.get('/logout', (req, res) => {
	if (req.session.user && req.cookies.user_sid) {
		res.clearCookie('user_sid');
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
});

router.get('/main/', function(req,res, next){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		res.render('main', {data:sess, user: sess.username});

	} else {
		res.redirect('/login');
	}

});

router.get('/main/openAudits/',function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		res.render('openAudits', {data:sess, user: sess.username});

	} else {
		res.redirect('/login');
	}
});

router.get('/pre-engagement/client-acceptance',function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		res.render('client-acceptance', {data:sess, user: sess.username});
	} else {
		res.redirect('/login');
	}
});

router.post('/pre-engagement/client-acceptance', function(req, res){

	if (req.session.user && req.cookies.user_sid) {

		//create score counter and calculate overall score
		let scoreCount = 0;
		let aboveThreshold = false;
		let auditAuthorised = false;

		function calcThreshold(){
			if(req.body.yesNoNAA=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAB=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAC=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAD=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAE=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAF=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAG=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAH=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAI=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAJ=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAK=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAL=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAM=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAN=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAO=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAP=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAQ=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAR=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAS=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAT=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAU=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAV=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAW=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAX=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAY=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAZ=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAA=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAB=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAC=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAD=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAE=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAF=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAG=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAH=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAI=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAAJ=='Yes'){scoreCount+=1}

			if(scoreCount>=32){
				aboveThreshold=true;
				auditAuthorised =true;
			}else{
				aboveThreshold=false;
			}
		}
		calcThreshold();

		//create model for data to be sent to database
		const item = {
			company: req.body.company,
			engagementYearEnd: req.body.engagementYearEnd,
			date: req.body.today,
			wpRef: '10.14A',
			commWithPrevAuditors: req.body.yesNoNAA,
			communicateCommentsA: req.body.communicateCommentsA,
			ascertainIfAdvisedAccountant: req.body.yesNoNAB,
			ascertainCommentsB: req.body.ascertainCommentsB,
			didWeRequestPerm: req.body.yesNoNAC,
			satisfiedCommentsC: req.body.satisfiedCommentsC,
			didWeDecline: req.body.yesNoNAD,
			permissionCommentsD: req.body.permissionCommentsD,
			didWeAsk: req.body.yesNoNAE,
			accountantCommentsE: req.body.accountantCommentsE,
			didWeAttemptToCommWithExistingAcc: req.body.yesNoNAF,
			replyCommentsF: req.body.replyCommentsF,
			discWithThirdParties: req.body.yesNoNAG,
			discussionsCommentsG: req.body.discussionsCommentsG,
			inquiriesOfOtherFirmPersonnel: req.body.yesNoNAH,
			inquiriesCommentsH: req.body.inquiriesCommentsH,
			inquiriesOfThirdParties: req.body.yesNoNAI,
			thirdCommentsI: req.body.thirdCommentsI,
			performBackgroundSearches: req.body.yesNoNAJ,
			backgroundCommentsJ: req.body.backgroundCommentsJ,
			honestRelationship: req.body.yesNoNAK,
			honestCommentsK: req.body.honestCommentsK,
			highRiskClient: req.body.yesNoNAL,
			managedCommentsL: req.body.managedCommentsL,
			changesInManagement: req.body.yesNoNAM,
			changesCommentsM: req.body.changesCommentsM,
			solvencyLevels: req.body.yesNoNAN,
			solvencyCommentsN: req.body.solvencyCommentsN,
			dominantIndividual: req.body.yesNoNAO,
			dominantCommentsO: req.body.dominantCommentsO,
			historyOfLawsuits: req.body.yesNoNAP,
			lawsuitsCommentsP: req.body.lawsuitsCommentsP,
			otherOffices: req.body.yesNoNAQ,
			otherEngagementsCommentsQ: req.body.otherEngagementsCommentsQ,
			identityKnown: req.body.yesNoNAR,
			identityCommentsR: req.body.identityCommentsR,
			businessReputation: req.body.yesNoNAS,
			reputationCommentsS: req.body.reputationCommentsS,
			familiarWithOps: req.body.yesNoNAT,
			familiarCommentsT: req.body.familiarCommentsT,
			informationConcerningAttitude: req.body.yesNoNAU,
			attitudeCommentsU: req.body.attitudeCommentsU,
			concernedWithMaintainingFees: req.body.yesNoNAV,
			aggresivelyCommentsV: req.body.aggresivelyCommentsV,
			inappropriateLimitation: req.body.yesNoNAW,
			limitationCommentsW: req.body.limitationCommentsW,
			involvedInMoneyLaundering: req.body.yesNoNAX,
			launderingCommentsX: req.body.launderingCommentsX,
			activitiesOfNOCLAR: req.body.yesNoNAY,
			noclarCommentsY: req.body.noclarCommentsY,
			reasonsForAppointment: req.body.yesNoNAZ,
			appointmentCommentsZ: req.body.appointmentCommentsZ,
			knowledgeOfIndustry: req.body.yesNoNAAA,
			industryCommentsAA: req.body.industryCommentsAA,
			experienceWithRequirements: req.body.yesNoNAAB,
			experienceCommentsAB: req.body.experienceCommentsAB,
			sufficientPersonnel: req.body.yesNoNAAC,
			personnelCommentsAC: req.body.personnelCommentsAC,
			expertsAvailable: req.body.yesNoNAAD,
			expertsCommentsAD: req.body.expertsCommentsAD,
			eqcrAvailable: req.body.yesNoNAAE,
			eqcrCommentsAE: req.body.eqcrCommentsAE,
			ableToComplete: req.body.yesNoNAAF,
			deadlineCommentsAF: req.body.deadlineCommentsAF,
			specialisedIndustryFactors: req.body.yesNoNAAG,
			factorsCommentsAG: req.body.factorsCommentsAG,
			significantBranches: req.body.yesNoNAAH,
			branchesCommentsAH: req.body.branchesCommentsAH,
			deadlineCoincideWithPressures: req.body.yesNoNAAI,
			pressuresCommentsAI: req.body.pressuresCommentsAI,
			independenceThreats: req.body.yesNoNAAJ,
			independenceCommentsAJ: req.body.independenceCommentsAJ,
			scoreCount,
			aboveThreshold,
			auditAuthorised
		};

		// a new document instance
		const new_pre_engagement = new PreEngagement(item);

		// save model to database
		new_pre_engagement.save(function (err, insert_values) {
			if (err) return console.error(err);
			console.log(insert_values.company + " successfully inserted");
		});

		console.log('Client Acceptance record created for client: '+req.body.company);
	} else {
		res.redirect('/login');
	}

});

router.get('/pre-engagement/continuance-evaluation-of-client-relationship', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		res.render('continuance-evaluation-of-client-relationship', {data:sess, user: sess.username});
	} else {
		res.redirect('/login');
	}
});

router.post('/pre-engagement/continuance-evaluation-of-client-relationship', function(req, res){

	if (req.session.user && req.cookies.user_sid) {
		//create score counter and calculate overall score
		var scoreCount=0;
		var aboveThreshold=false;
		var auditAuthorised=false;

		function calcThreshold(){
			if(req.body.yesNoNAA=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAB=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAC=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAD=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAE=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAF=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAG=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAH=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAI=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAJ=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAK=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAL=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAM=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAN=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAO=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAP=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAQ=='Yes'){scoreCount+=1}
			if(req.body.yesNoNAR=='Yes'){scoreCount+=1}

			if(scoreCount>=14){
				aboveThreshold=true;
				auditAuthorised =true;
			}else{
				aboveThreshold=false;
			}
		}

		calcThreshold();

		//create model for data to be sent to database
		var item = {
			company:req.body.company,
			engagementYearEnd:req.body.engagementYearEnd,
			date:req.body.today,
			wpRef:'10.14B',
			honestRelationship:req.body.yesNoNAA,
			communicateCommentsA:req.body.communicateCommentsA,
			canHighRiskClientBeManaged:req.body.yesNoNAB,
			ascertainCommentsB:req.body.ascertainCommentsB,
			changesInManagement:req.body.yesNoNAC,
			satisfiedCommentsC:req.body.satisfiedCommentsC,
			clientSolvency:req.body.yesNoNAD,
			permissionCommentsD:req.body.permissionCommentsD,
			historyOfLawsuits:req.body.yesNoNAE,
			accountantCommentsE:req.body.accountantCommentsE,
			identityOfPrincipal:req.body.yesNoNAF,
			replyCommentsF:req.body.replyCommentsF,
			businessReputationofPrincipal:req.body.yesNoNAG,
			discussionsCommentsG:req.body.discussionsCommentsG,
			informationConcerningAttitude:req.body.yesNoNAH,
			inquiriesCommentsH:req.body.inquiriesCommentsH,
			clientAggressivelyConcerned:req.body.yesNoNAI,
			thirdCommentsI:req.body.thirdCommentsI,
			indicationOfInappropriateLimitation:req.body.yesNoNAJ,
			backgroundCommentsJ:req.body.backgroundCommentsJ,
			sufficientKnowledgeOfIndustry:req.body.yesNoNAK,
			honestCommentsK:req.body.honestCommentsK,
			experienceWithRegulatory:req.body.yesNoNAL,
			managedCommentsL:req.body.managedCommentsL,
			sufficientPersonnel:req.body.yesNoNAM,
			changesCommentsM:req.body.changesCommentsM,
			expertsAvailable:req.body.yesNoNAN,
			solvencyCommentsN:req.body.solvencyCommentsN,
			eqcrAvailable:req.body.yesNoNAO,
			dominantCommentsO:req.body.dominantCommentsO,
			specialisedIndustryFactors:req.body.yesNoNAP,
			lawsuitsCommentsP:req.body.lawsuitsCommentsP,
			significantBranches:req.body.yesNoNAQ,
			otherEngagementsCommentsQ:req.body.otherEngagementsCommentsQ,
			consideredPartnerRootation:req.body.yesNoNAR,
			identityCommentsR:req.body.identityCommentsR,
			scoreCount,
			aboveThreshold,
			auditAuthorised
		};


		// a new document instance
		const new_pre_engagement = new PreEngagement(item);
		// save model to database
		new_pre_engagement.save(function (err, insert_values) {
			if (err) return console.error(err);
			console.log(insert_values.company + " successfully inserted");
		});

		console.log('Continuance Evaluation record created for client: '+req.body.company);

	} else {
		res.redirect('/login');
	}

});

router.get('/pre-engagement/finalize-pre-engagement', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		var companyArray = [];
		var yearEndArray = [];

		// using promise (mongoose 4+)
		PreEngagement.find({auditAuthorised:false}).then( function(docs) {
			docs.forEach(function (doc) {
				//companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('finalize-pre-engagement', { items: docs, data:sess, user: sess.username });
		});
		
	} else {
		res.redirect('/login');
	}
});

router.get('/pre-engagement/edit-failed-pre-engagement', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		var companyArray = [];
		var yearEndArray = [];

		// using promise (mongoose 4+)
		PreEngagement.find({auditAuthorised:false}).then( function(docs) {
			docs.forEach(function (doc) {
				//companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			console.log(docs);
			res.render('edit-failed-pre-engagement', { items: docs, data:sess, user: sess.username });
		});
		
	} else {
		res.redirect('/login');
	}
});



router.get('/file-assembly/upload-supporting-doc', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		// using promise (mongoose 4+)
		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('upload-supporting-doc', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.post('/file-assembly/upload-supporting-doc', function(req, res){
	if (req.session.user && req.cookies.user_sid) {

		
		//create model for data to be sent to database
		const item = {
			company: req.body.company,
			engagementYearEnd: req.body.engagementYearEnd,
			workPapers: req.body.workPapers,
			additionalComments: req.body.additionalComments			
		};

		// a new document instance
		const new_upload_supporting_doc = new UploadSupportingDoc(item);

		// save model to database
		new_upload_supporting_doc.save(function (err, insert_values) {
			if (err) return console.error(err);
			console.log(insert_values.company + " upload supporting doc successfully inserted");
		});
		//redirect to index route
		res.redirect('/main');

	} else {
		res.redirect('/login');
	}
});

router.get('/field-work/investment-property', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('investment-property', { items: docs, data:sess, user: sess.username });
		});

		
	} else {
		res.redirect('/login');
	}
});

router.post('/field-work/investment-property', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		//create model for data to be sent to database
		var item = {
			company:req.body.company,
			engagementYearEnd:req.body.engagementYearEnd,
			preparedBy:req.body.preparedBy,
			reviewedBy:req.body.reviewedBy,
			property12014Bal:req.body.property12014Bal,
			property12014WPRef:req.body.property12014WPRef,
			property12013Bal:req.body.property12013Bal,
			property12013WPRef:req.body.property12013WPRef,
			property1TracedToTitle:req.body.property1TracedToTitle
		};

		// a new document instance
		const new_investment = new Investment(item);

		// save model to database
		new_investment.save(function (err, insert_values) {
			if (err) return console.error(err);
			console.log(insert_values.company + "  Investment property successfully updated");
		});

		//redirect to index route
		res.redirect('/main');

	} else {
		res.redirect('/login');
	}
});

router.get('/field-work/intangible-assets-a', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('intangible-assets-a', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.post('/field-work/intangible-assets-a', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		//create model for data to be sent to database
		var item = {
			company:req.body.company,
			engagementYearEnd:req.body.engagementYearEnd,
			preparedBy:req.body.preparedBy,
			reviewedBy:req.body.reviewedBy,
			wpRef:'23.40A',
			overallMaterialityAmount:req.body.overallMaterialityAmount,
			overallMaterialityWPRef:req.body.overallMaterialityWPRef,
			significantRiskPerfMaterialityAmount:req.body.significantRiskPerfMaterialityAmount,
			significantRiskPerfMaterialityWPRef:req.body.significantRiskPerfMaterialityWPRef,
			nonSignificantRiskPerfMaterialityAmount:req.body.nonSignificantRiskPerfMaterialityAmount,
			nonSignificantRiskPerfMaterialityWPRef:req.body.nonSignificantRiskPerfMaterialityWPRef,
			clearlyTrivialAmount:req.body.clearlyTrivialAmount,
			clearlyTrivialWPRef:req.body.clearlyTrivialWPRef,
			intangibleAssetsPerAFS2018:req.body.intangibleAssetsPerAFS2018,
			intangibleAssetsPerAFSWPRef:req.body.intangibleAssetsPerAFSWPRef,
			intangibleAssetsPerAFS2017:req.body.intangibleAssetsPerAFS2017
		};

		// a new document instance
		const new_intangible_assets_a = new IntangibleAssetsA(item);

		// save model to database
		new_intangible_assets_a.save(function (err, insert_values) {
			if (err) return console.error(err);
			console.log(insert_values.company + "  Intangible Assets(Movement Schedule) successfully updated");
		});

		//redirect to index route
		res.redirect('/main');

	} else {
		res.redirect('/login');
	}
});

router.get('/field-work/intangible-assets-b', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('intangible-assets-b', { items: docs,data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/field-work/intangible-assets-c', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('intangible-assets-c', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/field-work/group-loans', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('group-loans', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/upload', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;

		res.render('upload-assessment-of-staff-for-engagement', { items: companyArray, itemsYear: yearEndArray,data:sess, user: sess.username });
	} else {
		res.redirect('/login');
	}
});

router.get('/planning/assessment-of-staff-for-engagement', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('assessment-of-staff-for-engagement', { items: docs,data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/risk-assessment-a', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('risk-assessment-a', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.post('/planning/risk-assessment-a', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		var item = {
			company:req.body.company,
			engagementYearEnd:req.body.engagementYearEnd,
			preparedBy:req.body.preparedBy,
			reviewedBy:req.body.reviewedBy,
			fraudCorruptionRiskCategory:req.body.fraudCorruptionRiskCategory,
			fraudCorruptionRiskProcedures:req.body.fraudCorruptionRiskProcedures,
			fraudCorruptionRiskSignificant:req.body.fraudCorruptionRiskSignificant,
			fraudCorruptionRiskExplanation:req.body.fraudCorruptionRiskExplanation,
			fraudCorruptionRiskWPReference:req.body.fraudCorruptionRiskWPReference
		};
		console.log(item.company+' '+ item.engagementYearEnd+' '+ item.preparedBy+' '+item.reviewedBy);

		// a new document instance
		const new_risk = new Risk(item);

		// save model to database
		new_risk.save(function (err, insert_values) {
			if (err) return console.error(err);
			console.log(insert_values.company + "Risks at FSL successfully updated");
		});

		//redirect to index route
		res.redirect('/main');
	} else {
		res.redirect('/login');
	}
});

router.get('/planning/risk-assessment-b', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('risk-assessment-b', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/risk-assessment-c', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('risk-assessment-c', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/risk-assessment-d', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('risk-assessment-d', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/identifying-risks-through-understanding-the-entity', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('identifying-risks-through-understanding-the-entity', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/client-service-plan', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('client-service-plan', { items: docs, data:sess, user: sess.username });
		});
	} else {
		res.redirect('/login');
	}
});

router.get('/planning/going-concern', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				//console.log(doc);
				//companyArray.push(doc);
				//yearEndArray.push(doc.engagementYearEnd);
			});
			console.log(docs);
			res.render('going-concern', { items: docs, data:sess, user: sess.username });
		});



		console.log(companyArray);
		//res.render('going-concern', { items: companyArray, itemsYear: yearEndArray,data:sess, user: sess.username });
	} else {
		res.redirect('/login');
	}
});

router.post('/planning/going-concern', function(req, res){
	if (req.session.user && req.cookies.user_sid) {

		
		//create model for data to be sent to database
		const item = {
			company: req.body.company,
			engagementYearEnd: req.body.engagementYearEnd,
			date: req.body.today,
			wpRef: '02.20',
			doesMaterialityUncertaintyA: req.body.doesMaterialityUncertaintyA,
			commentA: req.body.commentA,
			doesMaterialityUncertaintyB: req.body.doesMaterialityUncertaintyB,
			commentB: req.body.commentB,
			doesMaterialityUncertaintyD: req.body.doesMaterialityUncertaintyD,
			commentD: req.body.commentD,
			doesMaterialityUncertaintyE: req.body.doesMaterialityUncertaintyE,
			commentE: req.body.commentE,
			doesMaterialityUncertaintyF: req.body.doesMaterialityUncertaintyF,
			commentF: req.body.commentF
		};

		// a new document instance
		const new_going_concern = new GoingConcern(item);

		// save model to database
		new_going_concern.save(function (err, insert_values) {
			if (err) return console.error(err);
			console.log(insert_values.company + " successfully inserted");
		});

		console.log('Client Acceptance record created for client: '+req.body.company);
	} else {
		res.redirect('/login');
	}
});

router.get('/planning/opening-balances-verification', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('opening-balances-verification', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/planning-minutes', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('planning-minutes', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/discussion-among-audit-team', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({ auditAuthorised:true }).then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('discussion-among-audit-team', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});


router.post('/planning/discussion-among-audit-team', function(req,res){
	if (req.session.user && req.cookies.user_sid) {

		
		//create model for data to be sent to database
		const item = {
			company: req.body.company,
			engagementYearEnd: req.body.engagementYearEnd,
			wpRef: '10.08A',
			meetingDate: req.body.meetingDate,
			updateOnAuditProgress: req.body.updateOnAuditProgress,
			independence: req.body.independence,
			reviewOfWork: req.body.reviewOfWork,
			fraud: req.body.fraud,
			sampleSelection: req.body.sampleSelection,
			anyOtherIssues: req.body.anyOtherIssues
		};

		// a new document instance
		const new_discussion_among_audit_team = new DiscussionAmongAuditTeam(item);

		// save model to database
		new_discussion_among_audit_team.save(function (err, insert_values) {
			if (err) return console.error(err);
			console.log(insert_values.company + " successfully inserted");
		});

		console.log('Discussion Among Audit Team record created for client: '+req.body.company);
	} else {
		res.redirect('/login');
	}
});



router.get('/planning/discussion-with-those-charged-with-governance-1d', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('discussion-with-those-charged-with-governance-1d', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/discussion-with-those-charged-with-governance-1c', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('discussion-with-those-charged-with-governance-1c', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/discussion-with-those-charged-with-governance-1b', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('discussion-with-those-charged-with-governance-1b', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/discussion-with-those-charged-with-governance-1a', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('discussion-with-those-charged-with-governance-1a', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/preAudit-meeting-with-those-charged-with-governance', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('preAudit-meeting-with-those-charged-with-governance', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/threats-declaration', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('threats-declaration', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/partner-independence-declaration', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('partner-independence-declaration', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/work-and-time-allocation', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				// companyArray.push(doc.company);
				// yearEndArray.push(doc.engagementYearEnd);
			});
			res.render('work-and-time-allocation', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/planning/analytical-review-a', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find().then( function(docs) {
			docs.forEach(function (doc) {
				/*companyArray.push(doc.company);
				yearEndArray.push(doc.engagementYearEnd);*/
			});
			res.render('analytical-review-a', { items: docs, data:sess, user: sess.username });
		});
		
	} else {
		res.redirect('/login');
	}
});

router.get('/file-assembly/work-papers-by-client', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		const companyArray = [];
		const yearEndArray = [];

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				/*companyArray.push(doc.company);
				yearEndArray.push(doc.engagementYearEnd);*/
			});
			res.render('work-papers-by-client', { items: docs, data:sess, user: sess.username });
		});

		//res.render('work-papers-by-client', { items: companyArray, itemsYear: yearEndArray,data:sess, user: sess.username });
	} else {
		res.redirect('/login');
	}
});

router.post('/file-assembly/work-papers-by-client', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		// const companyArray = [];
		// const yearEndArray = [];

		var noteCompany = req.body.company;
		var noteEngagementYearEnd = req.body.engagementYearEnd;


		GoingConcern.find({ company:noteCompany, engagementYearEnd:noteEngagementYearEnd }).then(function(workPapers){
			workPapers.forEach(function(workPaper){

			});
			res.render('work-papers-by-client-results', { data:sess, user: sess.username,  workPapers:workPapers });
			console.log(workPapers);
		});

	} else {
		res.redirect('/login');
	}
});


router.get('/file-review/create-review-note', function(req, res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		// const companyArray = [];
		// const yearEndArray = [];
		const usersList = [];
		// const usersSurnames = [];

		//query users collection to get list of users
		User.find().then(function(records){
			records.forEach(function (record){
				usersList.push(record.username);
				// usersSurnames.push(record.surname);
			});
		});

		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				/*companyArray.push(doc.company);
				yearEndArray.push(doc.engagementYearEnd);*/
			});
			res.render('create-review-note', { items: docs, data:sess, user: sess.username, usersList:usersList });
		});

	} else {
		res.redirect('/login');
	}
});

router.post('/file-review/create-review-note', function(req, res){
	if (req.session.user && req.cookies.user_sid) {

		
		//create model for data to be sent to database
		const item = {
			company: req.body.company,
			engagementYearEnd: req.body.engagementYearEnd,
			preparedBy: req.body.preparedBy,
			reviewNoteTitle: req.body.reviewNoteTitle,
			reviewNoteDescription: req.body.reviewNoteDescription,
			wpToAttachTo: req.body.wpToAttachTo,
			priority: req.body.priority,
			assignTo: req.body.assignTo
		};

		// a new document instance
		const new_create_review_note = new CreateReviewNote(item);

		// save model to database
		new_create_review_note.save(function (err, insert_values) {
			if (err) return console.error(err);
			console.log("Review note for " + insert_values.company + " successfully created");
		});
		res.redirect('/main');
	} else {
		res.redirect('/login');
	}
});

router.get('/finalisation/review-notes-by-client', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		// const companyArray = [];
		// const yearEndArray = [];



		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				/*companyArray.push(doc.company);
				yearEndArray.push(doc.engagementYearEnd);*/
			});
			res.render('review-notes-by-client', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.post('/finalisation/review-notes-by-client', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		// const companyArray = [];
		// const yearEndArray = [];

		var noteCompany = req.body.company;
		var noteEngagementYearEnd = req.body.engagementYearEnd;


		CreateReviewNote.find({ company:noteCompany, engagementYearEnd:noteEngagementYearEnd }).then(function(reviews){
			reviews.forEach(function(review){

			});
			res.render('review-notes-by-client-results', { data:sess, user: sess.username,  reviewNotes:reviews });
			console.log(reviews);
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/final-reports/cover-letter-existing-client', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		// const companyArray = [];
		// const yearEndArray = [];



		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				/*companyArray.push(doc.company);
				yearEndArray.push(doc.engagementYearEnd);*/
			});
			res.render('cover-letter-existing-client', { items: docs, data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

router.get('/field-work/fixed-assets-testing-cost-and-nbv-material-a', function(req,res){
	if (req.session.user && req.cookies.user_sid) {
		sess = req.session.user;
		// const companyArray = [];
		// const yearEndArray = [];



		PreEngagement.find({auditAuthorised:true}).then( function(docs) {
			docs.forEach(function (doc) {
				/*companyArray.push(doc.company);
				yearEndArray.push(doc.engagementYearEnd);*/
			});
		    res.render('movement-schedule', {items:docs,data:sess, user: sess.username });
		});

	} else {
		res.redirect('/login');
	}
});

module.exports = router;


