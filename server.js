
var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices = require('botbuilder-cognitiveservices');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
console.log('testing');
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  console.log('Server listening');
// Create chat bot
var connector = new builder.ChatConnector({
 appId: process.env.MICROSOFT_APP_ID,
 appPassword: process.env.MICROSOFT_APP_PASSWORD
});
console.log('before api messages');
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
//=========================================================
// Bots Dialogs
//=========================================================

var recognizer = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: '2f299b74-a937-47e1-83f7-ddbcb1fc392d', 
	subscriptionKey: '69a94ba927e24471ad3b3554b93310fc'});
	
var basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({
	recognizers: [recognizer],
	defaultMessage: 'No match! Try changing the query terms!',
	qnaThreshold: 0.3
});
bot.dialog('/', basicQnAMakerDialog);

//bot.dialog('/', basicQnAMakerDialog);
//'https://api.projectoxford.ai/luis/v2.0/apps/ee1c24b7-afed-465d-9e00-a39c3cc89a9a?subscription-key=36f90c24d1f4499497eeffc302f8275b&verbose=true'